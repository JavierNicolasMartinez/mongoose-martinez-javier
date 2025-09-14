import { AchievementModel } from "../models/achievement.model.js";
import { UserModel } from "../models/user.model.js";

export const createAchievement = async (req, res) => {
  const { name, description, categoryId } = req.body;
  try {
    const newAchievement = await AchievementModel.create({
      name,
      description,
      category: categoryId,
    });

    res.status(201).json({
      ok: true,
      msg: "Logro creado correctamente",
      data: newAchievement,
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
    const logros = await AchievementModel.find()
      .populate("earnedBy") //Esto me va a rellenar los datos del usuario que ganó el logro
      .populate("category"); // categorias;

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
    const logro = await AchievementModel.findById(id)
      .populate("earnedBy")
      .populate("category");

    if (!logro) {
      return res.status(404).json({
        ok: false,
        msg: "Logro no encontrado",
      });
    }
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
  const { name, description, category } = req.body;

  try {
    const updatedAchievement = await AchievementModel.findByIdAndUpdate(
      id,
      { name, description, category }, //Puedes actualizar la caregoría si es necesario
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
    const achievementToDelete = await AchievementModel.findById(id);
    if (!achievementToDelete) {
      return res.status(404).json({
        ok: false,
        msg: "Logro no encontrado",
      });
    }

    // Si el logro está asignado a un usuario, quita la referencia
    if (achievementToDelete.earnedBy) {
      await UserModel.findByIdAndUpdate(achievementToDelete.earnedBy, {
        uniqueAchievement: null,
      });
    }

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

//Investigación para asignar el logro a un usuario:
// Función para asignar un logro a un usuario
export const assignAchievementToUser = async (req, res) => {
  const { achievementId, userId } = req.params;

  try {
    // 1. Verificar si el logro y el usuario existen
    const achievement = await AchievementModel.findById(achievementId);
    const user = await UserModel.findById(userId);

    if (!achievement || !user) {
      return res.status(404).json({
        ok: false,
        msg: "Logro o usuario no encontrado",
      });
    }

    // 2. Verificar si el logro ya tiene un ganador
    if (achievement.earnedBy) {
      return res.status(400).json({
        ok: false,
        msg: "Este logro ya ha sido ganado por un usuario",
      });
    }

    // 3. Asignar el logro al usuario y el usuario al logro (bidireccional)
    achievement.earnedBy = user._id; // Enlaza el logro al usuario
    user.uniqueAchievement = achievement._id; // Enlaza el usuario al logro

    // 4. Guardar los cambios en ambos documentos
    await achievement.save();
    await user.save();

    res.status(200).json({
      ok: true,
      msg: "Logro asignado al usuario correctamente",
      data: { achievement, user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

//Esta es la mejor forma que encontre para hacerlo de la manera que aprendimos en el curso.
