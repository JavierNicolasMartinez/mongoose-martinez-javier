import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

export const categoryRoutes = express.Router();
categoryRoutes.post("/category", createCategory);
categoryRoutes.get("/category", getAllCategory);
categoryRoutes.get("/category/:id", getCategoryById);
categoryRoutes.put("/category/:id", updateCategory);
categoryRoutes.delete("/category/:id", deleteCategory);
