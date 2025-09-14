import { AchievementModel } from "../models/achievement.model.js";

export const createAchievement = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newArchievement = await AchievementModel.create({
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

export const getAllAchievement = async (req, res) => {
  try {
    const logros = await AchievementModel.find();

    res.status(200).json({
      ok: true,
      data: logros,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAchievementById = async (req, res) => {
  const { id } = req.params;

  try {
    const logro = await AchievementModel.findById(id);

    res.status(200).json({
      ok: true,
      data: logro,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedAchievement = await AchievementModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Logro actualizado correctamente",
      data: updatedAchievement,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteAchievement = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAchievement = await AchievementModel.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Logro eliminado correctamente",
      data: deletedAchievement,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
