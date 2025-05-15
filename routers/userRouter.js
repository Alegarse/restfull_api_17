const express = require("express");
const router = express.Router();
const {
  getAllUser,
  //getUserById,
  getMyProfile,
  getUserByName,
  //addUser, 
  deleteUser,
  updateUser,
  replaceUser,
  addFavouriteMovie,
  delFavouriteMovie
} = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");

router.get("/", getAllUser);
//router.post("/", addUser);

//router.delete("/:idUser", deleteUser);
//router.get("/:idUser", getUserById);
//router.patch("/:idUser", updateUser);
//router.put("/:idUser", replaceUser);

router.get("/myProfile", verifyToken, getMyProfile);
router.delete("/", verifyToken, deleteUser);
router.patch("/", verifyToken, updateUser);
router.put("/", verifyToken, replaceUser);

router.get("/searchName/:name", getUserByName);
//router.patch("/:idUser/favourites/:idMovie", addFavouriteMovie);
//router.patch("/:idUser/removefavourites/:idMovie", delFavouriteMovie);

router.patch("/favourites/:idMovie", verifyToken, addFavouriteMovie);
router.patch("/removefavourites/:idMovie", verifyToken, delFavouriteMovie);


// Ahora exportamos este router creado
module.exports = router;