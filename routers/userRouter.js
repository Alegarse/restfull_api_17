const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getMyProfile,
  getUserByName,
  deleteUserProfile,
  updateUserProfile,
  replaceUserProfile,
  addFavouriteMovie,
  delFavouriteMovie,
  disableUserProfile,
} = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

// Endpoints iniciales
router.get("/", getAllUser);
//router.get("/",verifyToken, verifyAdmin, getAllUser);
router.get("/searchName/:name", getUserByName);

// Endpoints tokenizados
router.get("/myProfile", verifyToken, verifyAdmin, getMyProfile);
router.delete("/", verifyToken, deleteUserProfile);
router.patch("/", verifyToken, updateUserProfile);
router.put("/", verifyToken, replaceUserProfile);
router.patch("/favourites/:idMovie", verifyToken, addFavouriteMovie);
router.patch("/removefavourites/:idMovie", verifyToken, delFavouriteMovie);
router.patch("/disableuser",verifyToken, disableUserProfile)

// Ahora exportamos este router creado
module.exports = router;
