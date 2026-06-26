import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";

export const createTransaction = async (req, res) => {
  try {

    const {id} = req.user

    const {
      productId,
      transactionType,
      quantity,
      reason
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (transactionType === "Stock In") {
      product.quantity += quantity;
    }

    if (transactionType === "Stock Out") {
      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      product.quantity -= quantity;
    }

    if (transactionType === "Adjustment") {
      product.quantity = quantity;
    }

    await product.save();

    const transaction = await Stock.create({
      productId,
      transactionType,
      quantity,
      reason,
      performedBy : id,
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
    const { role, id } = req.user
    if (role !== "admin") {
      const transactions = await Stock.find({ performedBy: id })
        .populate("productId")
        .populate("performedBy");
      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      });
    }
    const transactions = await Stock.find()
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
    const transaction = await Stock.findByIdAndDelete(
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