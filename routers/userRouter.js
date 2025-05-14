const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  getUserByName,
  //addUser, 
  deleteUser,
  updateUser,
  replaceUser,
  addFavouriteMovie,
  delFavouriteMovie
} = require("../controllers/userController");

router.get("/", getAllUser);
//router.post("/", addUser);
router.delete("/:idUser", deleteUser);
router.get("/:idUser", getUserById);
router.get("/searchName/:name", getUserByName);
router.patch("/:idUser", updateUser);
router.put("/:idUser", replaceUser);
router.patch("/:idUser/favourites/:idMovie", addFavouriteMovie);
router.patch("/:idUser/removefavourites/:idMovie", delFavouriteMovie);


// Ahora exportamos este router creado
module.exports = router;