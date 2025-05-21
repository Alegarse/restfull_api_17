const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  removeMovieById,
  updateMovieById,
  getCountMoviesCategory,
  setCommentToMovie,
  deleteCommentToMovie
} = require("../controllers/movieController");

router.get("/", getAllMovies);
router.get("/searchcategory/",getCountMoviesCategory);
router.get("/:idMovie",getMovieById);
router.post("/", addMovie);
router.delete("/:idMovie",removeMovieById);
router.patch("/:idMovie",updateMovieById);
router.post("/comments/:idMovie", verifyToken, setCommentToMovie);
router.delete("/:idMovie/comments/:idComment", verifyToken, setCommentToMovie);

// Ahora exportamos este router creado
module.exports = router;