import { AchievementModel } from "../models/achievement.model.js";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password, profile } = req.body;

  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
      profile,
    });

    res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find()
      .populate("uniqueAchievement")
      .populate("badges");

    res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id)
      .populate("uniqueAchievement")
      .populate("badges");

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // const user = await UserModel.findById(id);

    // const updatedUser2 = await UserModel.updateOne({ _id: id }, { username });

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // const user = await UserModel.findById(id);

    // const deletedUser2 = await UserModel.deleteOne({ _id: id });
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Lógica para el "borrado en cascada":
    // Si el usuario tiene un logro único, bórralo también
    if (user.uniqueAchievement) {
      await AchievementModel.findByIdAndDelete(user.uniqueAchievement);
    }

    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado correctamente",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
//Información: Funciones de js cuando tenemos un objeto: Push (recomendado por el profe - Save)
export const addBadgeToUser = async (req, res) => {
  const { userId, badgeId } = req.params;
  console.log({ userId, badgeId });
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Verifica si la insignia ya existe para evitar duplicados
    if (user.badges.includes(badgeId)) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya tiene esta insignia",
      });
    }
    user.badges.push(badgeId); // Agregar el ID de la insignia al array
    await user.save(); // Guardar el usuario con la nueva insignia

    // Puedo usar populate para devolver el usuario con la insignia agregada asi me aparece todo
    const updatedUser = await UserModel.findById(userId)
      .populate("uniqueAchievement")
      .populate("badges");
    res
      .status(200)
      .json({ ok: true, msg: "Insignia agregada", data: updatedUser });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
