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
    const users = await UserModel.find();

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
    const user = await UserModel.findById(id);

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
