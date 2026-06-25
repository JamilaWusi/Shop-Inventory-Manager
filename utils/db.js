import mongoose from "mongoose";


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        dbName: "student_manager"
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;