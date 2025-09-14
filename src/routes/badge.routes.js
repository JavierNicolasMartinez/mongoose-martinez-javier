import express from "express";
import {
  createBadge,
  deleteBadge,
  getAllBadge,
  getBadgeById,
  updateBadge,
} from "../controllers/badge.controller.js";

export const badgeRoutes = express.Router();
badgeRoutes.post("/badge", createBadge);
badgeRoutes.get("/badge", getAllBadge);
badgeRoutes.get("/badge/:id", getBadgeById);
badgeRoutes.put("/badge/:id", updateBadge);
badgeRoutes.delete("/badge/:id", deleteBadge);
