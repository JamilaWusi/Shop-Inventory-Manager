import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";

export const createTransaction = async (req, res) => {
  try {
    const {
      productId,
      transactionType,
      quantity,
      reason,
      performedBy,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (transactionType === "Stock In") {
      product.currentStockQuantity += quantity;
    }

    if (transactionType === "Stock Out") {
      if (product.currentStockQuantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      product.currentStockQuantity -= quantity;
    }

    if (transactionType === "Adjustment") {
      product.currentStockQuantity = quantity;
    }

    await product.save();

    const transaction = await StockTransaction.create({
      productId,
      transactionType,
      quantity,
      reason,
      performedBy,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all stock transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
      .populate("productId")
      .populate("performedBy");

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete transactions
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await StockTransaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};