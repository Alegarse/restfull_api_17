const users = require("../db/users"); //MOCK
const userModel = require("../models/userModel"); // Usando ya BBDD MongoDb

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if(!users.length){
      return res.status(200).send("No hay usuarios");
    }
    res.status(200).send({status: "Success", data: users});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    await userModel.create(newUser);
    res.status(200).send("El usuario se ha creaado correctamente");
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
}

// Usamos find cuando el resultado solo es unico
// Usamos flter si queremos que pueda devolver varios resultados

const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findById(idUser);
    if(!user){
      return res.status(200).send("No hay usuario con ese Id");
    }
    res.status(200).send({status: "Success", data: user});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await userModel.find({name: {$regex: name, $options: "i" }});
    if(!users.length){
      return res.status(200).send("No hay usuarios con ese nombre");
    }
    res.status(200).send({status: "Success", data: users});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

const deleteUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findByIdAndDelete(idUser);
    if(!user){
      return res.status(200).send("No hay usuario con ese Id");
    }
    res.status(200).send({status: "Success", message: "El usuario ha sido eliminado"});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  } 
}

const updateUser = async (req, res) => {
try {
    const { idUser } = req.params;
    const newUser = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      idUser,
      newUser,
      {
        new: false, // Devuelve el usuario nuevo creado. Si false, el antiguo que se ha sobreescrito
        runValidators: true // Ejecuta las validaciones del userModel
      }
    );
    if (!updatedUser) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res.status(200).send({status: "Success", message: "El usuario ha sido modificado"});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
}

const replaceUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const newUser = req.body;
    const replaceUser = await userModel.findOneAndReplace(
      { _id: idUser },
      newUser,
      {
        new: true, // Devuelve el usuario nuevo creado. Si false, el antiguo que se ha sobreescrito
        runValidators: true // Ejecuta las validaciones del userModel
      }
    );
    if (!replaceUser) {
      return res.status(200).send("No hay usuario con ese Id");
    }
    res.status(200).send({status: "Success", message: "El usuario ha sido reemplazado"});
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  addUser,
  deleteUser,
  updateUser,
  replaceUser
};
