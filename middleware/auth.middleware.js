import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token =
                req.headers.authorization.split(" ")[1];
            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Not authorized"
            });
        }
    } else {
        res.status(401).json({
            message: "You need to be logged in"
        });
    }
};


export async function onlyAllowAdmin (req, res, next) {
    try {
         const role = req.user.role
         if(role === "admin") {
            next()
         } else {
            res.status(403).json({msg: "only for admins"})
         }
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}