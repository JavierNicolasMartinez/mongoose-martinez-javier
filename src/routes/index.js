import express from "express";
import { userRoutes } from "./user.routes.js";
import { achievementRoutes } from "./achievement.routes.js";

export const routesVarias = express.Router();
routesVarias.use(userRoutes);
routesVarias.use(achievementRoutes);
