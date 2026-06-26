import Supplier from "../models/supplier.model.js";

export const createSupplier = async (req, res) => {
  try {
    const {id} = req.user
    const supplier = await Supplier.create({...req.body, createdBy: id});

    res.status(201).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const { role, id } = req.user
    if (role !== "admin") {
      const suppliers = await Supplier.find({ createdBy: id });
      return res.status(200).json({
        success: true,
        count: suppliers.length,
        data: suppliers,
      });
    } 
    const suppliers = await Supplier.find();

    res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSupplier = async (req, res) => {
  try {
    const id = req.params.id
    const supplier = await Supplier.findById(id)
    if (!supplier) {
      return res.status(404).json({ msg: `Supplier not found` })
    }
    return res.status(200).json(supplier)
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

//updtate supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete a supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};