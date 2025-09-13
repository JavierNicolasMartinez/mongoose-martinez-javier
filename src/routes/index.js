import express from "express";
import { userRoutes } from "./user.routes.js";

export const routesVarias = express.Router();
routesVarias.use(userRoutes);
