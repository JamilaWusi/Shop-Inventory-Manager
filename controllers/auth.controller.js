import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Register
export const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        if (error.code && error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" })
        }
        res.status(500).json({
            message: error.message
        });

    }

}




// Login

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

}


export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById({ _id: userId }).select('-password')
        if (!user) {
            return res.status(404).json({ msg: `User not found` })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId, req.body.password)
        const user = await User.findByIdAndUpdate(userId, { password: req.body.password }, { new: true }).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}
