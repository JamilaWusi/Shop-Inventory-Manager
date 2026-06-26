import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const userId = req.user.id
    const product = await Product.create({...req.body, createdBy: userId});

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get a product
export const getProducts = async (req, res) => {
  try {
    const { id, role } = req.user
    if (role === "admin") {
      const products = await Product.find();

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } else {
      const products = await Product.find({ userId: id });
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single producet
export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ msg: `Product not found` })
    }
    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updtated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//const products = await Product.find()
//.populate("category", "name")
//.populate("supplier", "supplierName")
//.populate("createdBy", "firstName lastName");