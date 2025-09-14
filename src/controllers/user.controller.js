import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
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
  const { username } = req.body;

  try {
    // const user = await UserModel.findById(id);

    // const updatedUser2 = await UserModel.updateOne({ _id: id }, { username });

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

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

    const deletedUser = await UserModel.findByIdAndDelete(id);

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
    user.badges.push(badgeId); // Agrega el ID de la insignia al array
    await user.save(); // Guarda el usuario con la nueva insignia

    // Puedo usar populate para devolver el usuario con la insignia agregada asi me aparece todo
    const updatedUser = await UserModel.findById(userId)
      .populate("uniqueAchievement")
      .populate("badges");
    res
      .status(200)
      .json({ ok: true, msg: "Insignia agregada", data: updateUser });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
