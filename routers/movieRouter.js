const express = require("express");
const router = express.Router();
const {
  addMovie,
  getAllMovies,
} = require("../controllers/movieController");

router.get("/", getAllMovies);
router.post("/", addMovie);

// Ahora exportamos este router creado
module.exports = router;