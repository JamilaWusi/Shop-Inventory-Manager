

export const getTransactionHistory = async (req, res) => {
  try {
    const history = await StockTransaction.find()
      .populate("productId", "productName")
      .populate("performedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};