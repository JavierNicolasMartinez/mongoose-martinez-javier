import { CategoryModel } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await CategoryModel.create({
      name,
      description,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categorias = await CategoryModel.find();

    res.status(200).json({
      ok: true,
      data: categorias,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await CategoryModel.findById(id);

    res.status(200).json({
      ok: true,
      data: categoria,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Categoria actualizada correctamente",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Categoria eliminada correctamente",
      data: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
