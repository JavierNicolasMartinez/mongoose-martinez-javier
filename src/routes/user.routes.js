import express from "express";
import { createUser } from "../controllers/user.controller.js";

export const userRoutes = express.Router();
userRoutes.post("/users", createUser);
