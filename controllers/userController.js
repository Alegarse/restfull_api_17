const users = require("../db/users"); //MOCK
const userModel = require("../models/userModel"); // Usando ya BBDD MongoDb

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({},{});
    res.send(users);
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

// Usamos find cuando el resultado solo es unico
// Usamos flter si queremos que pueda devolver varios resultados

const getUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await userModel.find({_id: idUser},{});
    res.send(user);
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

const getUserByName = async (req, res) => {
  const { name } = req.params;
  try {
    const users = await userModel.find({name: {$regex: name}},{});
    res.send(users);
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};

/*const getUserByEdad = async (req, res) => {
  const { age } = req.params;
  try {
    const users = await userModel.find({edad: age},{});
    res.send(users);
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
};*/

const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    await userModel.create(newUser);
    res.status(200).send("El usuario se ha creaado correctamente");
  } catch (error) {
    res.status(500).send({status: "Failed", error: error.message})
  }
}

const deleteUser = (req, res) => {
    
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  //getUserByEdad,
  addUser,
  deleteUser
};
