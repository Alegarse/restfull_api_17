const userModel = require("../models/userModel"); // Usando ya BBDD MongoDb
const movieModel = require("../models/moviesModel");

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users.length) {
      return res.status(200).send({message: "No hay usuarios"});
    }
    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

/* const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    await userModel.create(newUser);
    res.status(200).send("El usuario se ha creaado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
}; */

// Usamos find cuando el resultado solo es unico
// Usamos flter si queremos que pueda devolver varios resultados
//const getUserById = async (req, res) => {
const getMyProfile = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const user = await userModel
      .findById(idUser)
      .populate({ path: "favourites", select: "-_id title description" });
    if (!user) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await userModel.find({
      name: { $regex: name, $options: "i" },
    });
    if (!users.length) {
      return res.status(200).send({ message: "No hay usuarios con ese nombre"});
    }
    res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res
      .status(200)
      .send({ status: "Success", message: "El usuario ha sido eliminado" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const newUser = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: false, // Devuelve el usuario nuevo creado. Si false, el antiguo que se ha sobreescrito
      runValidators: true, // Ejecuta las validaciones del userModel
    });
    if (!updatedUser) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res
      .status(200)
      .send({ status: "Success", message: "El usuario ha sido modificado" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const replaceUserProfile = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const newUser = req.body;
    const replaceUserProfile = await userModel.findOneAndReplace(
      { _id: idUser },
      newUser,
      {
        new: true, // Devuelve el usuario nuevo creado. Si false, el antiguo que se ha sobreescrito
        runValidators: true, // Ejecuta las validaciones del userModel
      }
    );
    if (!replaceUserProfile) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res
      .status(200)
      .send({ status: "Success", message: "El usuario ha sido reemplazado" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addFavouriteMovie = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const { idMovie } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario");
    }

    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No existe pelicula con ese Id");
    }

    if (user.favourites.includes(idMovie)) {
      return res.status(200).send("La película ya está en favoritos");
    }

    user.favourites.push(idMovie);
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const delFavouriteMovie = async (req, res) => {
  try {
    const idUser  = req.payload._id;
    const { idMovie } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No hay película con ese Id");
    }
    if (!user.favourites.includes(idMovie)) {
      return res.status(200).send("La película no está en favoritos");
    }

    user.favourites.pull(idMovie); // Pull es nativo de mongoose, es para borrar ese id
    user.save();

    res.status(200).send({ status: "Success", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const disableUserProfile = async (req, res) => {
try {
    const idUser  = req.payload._id;
    const disabledUser = {
      isActive: false,
    };
    const updatedUser = await userModel.findByIdAndUpdate(idUser, disabledUser, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(200).send("No hay un usuario activo con ese Id");
    }
    res
      .status(200)
      .send({ status: "Success", message: "El usuario ha sido modificado", data: updatedUser});
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
}


module.exports = {
  getAllUser,
  getMyProfile,
  getUserByName,
  deleteUserProfile,
  updateUserProfile,
  replaceUserProfile,
  addFavouriteMovie,
  delFavouriteMovie,
  disableUserProfile,
};
