const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  getUserByName, 
  addUser, 
  deleteUser
} = require("../controllers/userController");

router.get("/", getAllUser);
router.post("/", addUser);
router.delete("/", deleteUser)
router.get("/:idUser", getUserById);
router.get("/search/:name", getUserByName);


// Ahora exportamos este router creado
module.exports = router;
