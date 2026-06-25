import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import stockRoutes from "./routes/stock.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import categoryRoutes from "./routes/category.route.js";

import { onlyAllowAdmin, protect } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", protect, productRoutes);
app.use("/api/users", protect, onlyAllowAdmin, userRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/", (req,res)=>{
    res.json({
        message:"Shop Inventory API running"
    });
});


const PORT = process.env.PORT || 5000;



//app.use(express.json());



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
//Gu6Rpq6YNGlMz3ik
//mongodb+srv://manager:<db_password>@cluster0.ctrml47.mongodb.net/?appName=Cluster0