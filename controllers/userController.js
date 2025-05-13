const users = require("../db/users");

const getAllUser = (req, res) => {
  res.send(users);
};

// Usamos find cuando el resultado solo es unico
// Usamos flter si queremos que peuda devolver varios resultados

const getUserById = (req, res) => {
  //const idUser = req.params.idUser;
  const { idUser } = req.params;
  console.log(idUser);
  const user = users.find((u) => u.id === parseInt(idUser));
  if (!user) return res.status(200).send("No hay usuarios");
  res.send(user);
};

const getUserByName = (req, res) => {
  const { name } = req.params;
  console.log(name);
  const user = users.filter((u) => u.nombre.includes(name));
  if (user.length === 0) return res.status(200).send("No hay usuarios con ese nombre");
  res.send(user);
};

const getUserByEdad = (req, res) => {
  const { age } = req.params;
  console.log(age);
  const user = users.filter((u) => u.edad === parseInt(age));
  if (user.length === 0) return res.status(200).send("No hay usuarios con esa edad");
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
