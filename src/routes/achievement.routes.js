import {
  assignAchievementToUser,
  createAchievement,
  deleteAchievement,
  getAchievementById,
  getAllAchievement,
  updateAchievement,
} from "../controllers/achievement.controller.js";
import express from "express";

export const achievementRoutes = express.Router();
achievementRoutes.put(
  "/achievements/:achievementId/assign/:userId",
  assignAchievementToUser
);
achievementRoutes.post("/achievement", createAchievement);
achievementRoutes.get("/achievement", getAllAchievement);
achievementRoutes.get("/achievement/:id", getAchievementById);
achievementRoutes.put("/achievement/:id", updateAchievement);
achievementRoutes.delete("/achievement/:id", deleteAchievement);
