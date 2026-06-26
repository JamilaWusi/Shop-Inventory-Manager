import express from "express";
import { createProduct, getProducts, deleteProduct, updateProduct, getSingleProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

export default router;