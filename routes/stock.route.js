import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);
router.get("/:id", protect, getTransactionById);
router.delete("/:id", deleteTransaction);

export default router;