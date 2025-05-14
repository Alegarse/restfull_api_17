const movieModel = require("../models/moviesModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    await movieModel.create(newMovie);
    res.status(200).send("La película se ha creaado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    if (!movies.length) {
      return res.status(200).send("No hay películas");
    }
    res.status(200).send({ status: "Success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No hay película por ese Id");
    }
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const removeMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findByIdAndDelete(idMovie);
    if (!movie) {
      return res.status(200).send("No hay película por ese Id");
    }
    res
      .status(200)
      .send({ status: "Success", message: "La pelicula ha sido eliminada" });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const newMovie = req.body;
    const movie = await movieModel.findByIdAndUpdate(idMovie, newMovie);
    if (!movie) {
      return res.status(200).send("No hay película por ese Id");
    }
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  removeMovieById,
  updateMovieById,
};
