const users = require("../db/users");

const getAllUser = (req, res) => {
  res.send(users);
};

const getUserById = (req, res) => {
  //const idUser = req.params.idUser;
  const { idUser } = req.params;
  console.log(idUser);
  const user = users.find((u) => u.id === parseInt(idUser));
  if (!user) return res.status(200).send("No hay usuarios");
  res.send(user);
};

const getUserByName = (req, res) => {
  const { nombre } = req.params;
  console.log(nombre);
  const user = users.filter((u) => u.nombre.includes(nombre));
  if (user.length === 0) return res.status(404).send("No hay usuarios con ese nombre");
  res.send(user);
};

const getUserByEdad = (req, res) => {
  const { edad } = req.params;
  console.log(edad);
  const user = users.filter((u) => u.edad === parseInt(edad));
  if (user.length === 0) return res.status(404).send("No hay usuarios con esa edad");
  res.send(user);
};

const addUser = (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    res.send('Usuario creado');
}

const deleteUser = (req, res) => {
    
}

module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  getUserByEdad,
  addUser,
  deleteUser
};
