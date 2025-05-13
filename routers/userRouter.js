const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  getUserByName,
  getUserByEdad, 
  addUser, 
  deleteUser
} = require("../controllers/userController");

router.get("/", getAllUser);
router.post("/", addUser);
router.delete("/", deleteUser)
router.get("/:idUser", getUserById);
router.get("/searchName/:name", getUserByName);
router.get("/searchAge/:age", getUserByEdad);


// Ahora exportamos este router creado
module.exports = router;
