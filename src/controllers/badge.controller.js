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
    const insignias = await BadgeModel.find().populate("users");

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
    const insignia = await BadgeModel.findById(id).populate("users");
    if (!insignia) {
      return res.status(404).json({
        ok: false,
        msg: "Insignia no encontrada",
      });
    }

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

//INVESTIGACIÓN DE ELIMINACIÓN
//Esta es la operación más importante y delicada. Al eliminar una insignia, debes asegurarte de que todas las referencias a ella en los documentos de User también se eliminen. Si no lo haces, crearías referencias colgantes (dangling references), lo que puede causar problemas a largo plazo.
export const deleteBadge = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Encuentra la insignia para verificar su existencia
    const badgeToDelete = await BadgeModel.findById(id);

    if (!badgeToDelete) {
      return res.status(404).json({
        ok: false,
        msg: "Insignia no encontrada",
      });
    }

    // 2. Encuentra todos los usuarios que tienen esta insignia
    const usersWithBadge = await UserModel.find({ badges: id });

    // 3. Itera sobre cada usuario y elimina la referencia de la insignia
    for (const user of usersWithBadge) {
      user.badges = user.badges.filter((badgeId) => badgeId.toString() !== id);
      await user.save();
    }

    const deletedBadge = await BadgeModel.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Insignia eliminada correctamente",
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

//información sobre parte añadida del delete:
//for (const user of usersWithBadge) { ... }
// Una vez que tienes la lista de usuarios afectados, tienes que procesar a cada uno de ellos. Se usa un bucle for...of para iterar sobre cada documento de usuario en la lista.
// user.badges = user.badges.filter(...): Aquí se usa el método filter() de JavaScript para crear un nuevo array de insignias. Este nuevo array incluirá todos los ObjectIds, excepto el ID de la insignia que estamos borrando. El badgeId.toString() !== id es necesario porque los IDs de Mongoose son objetos, por lo que se deben convertir a String para una comparación segura.
// await user.save();: Después de modificar el array badges, se llama a save() para guardar los cambios en la base de datos. Esta es una operación de escritura que actualiza el documento del usuario, quitando la referencia a la insignia.
