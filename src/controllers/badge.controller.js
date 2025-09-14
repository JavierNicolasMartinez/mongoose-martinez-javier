import { BadgeModel } from "../models/badge.model.js";

export const createBadge = async (req, res) => {
  const { name, iconUrl } = req.body;
  try {
    const newBadge = await BadgeModel.create({
      name,
      iconUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllBadge = async (req, res) => {
  try {
    const insignias = await BadgeModel.find();

    res.status(200).json({
      ok: true,
      data: insignias,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getBadgeById = async (req, res) => {
  const { id } = req.params;

  try {
    const insignia = await BadgeModel.findById(id);

    res.status(200).json({
      ok: true,
      data: insignia,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateBadge = async (req, res) => {
  const { id } = req.params;
  const { name, iconUrl } = req.body;

  try {
    const updatedBadge = await BadgeModel.findByIdAndUpdate(
      id,
      { name, iconUrl },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Insignia actualizada correctamente",
      data: updatedBadge,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteBadge = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBadge = await BadgeModel.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      data: deletedBadge,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
