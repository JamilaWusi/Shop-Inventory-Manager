import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();


const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


app.get("/", (req,res)=>{
    res.json({
        message:"Shop Inventory API running"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
//Gu6Rpq6YNGlMz3ik
//mongodb+srv://manager:<db_password>@cluster0.ctrml47.mongodb.net/?appName=Cluster0