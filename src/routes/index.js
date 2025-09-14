import express from "express";
import { userRoutes } from "./user.routes.js";
import { achievementRoutes } from "./achievement.routes.js";
import { badgeRoutes } from "./badge.routes.js";
import { categoryRoutes } from "./category.routes.js";

export const routesVarias = express.Router();
routesVarias.use(userRoutes);
routesVarias.use(achievementRoutes);
routesVarias.use(badgeRoutes);
routesVarias.use(categoryRoutes);
