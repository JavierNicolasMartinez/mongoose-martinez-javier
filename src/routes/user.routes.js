import express from "express";
import {
  addBadgeToUser,
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

export const userRoutes = express.Router();
userRoutes.put("/users/:userId/badges/:badgeId", addBadgeToUser);
userRoutes.post("/users", createUser);
userRoutes.get("/users", getAllUser);
userRoutes.get("/users/:id", getUserById);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
