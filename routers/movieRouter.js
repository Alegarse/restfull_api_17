const express = require("express");
const router = express.Router();
const {
  addMovie,
  getAllMovies,
  getMovieById,
  removeMovieById,
  updateMovieById
} = require("../controllers/movieController");

router.get("/", getAllMovies);
router.get("/:idMovie",getMovieById);
router.post("/", addMovie);
router.delete("/:idMovie",removeMovieById);
router.patch("/",updateMovieById);

// Ahora exportamos este router creado
module.exports = router;