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

module.exports = {
  addMovie,
  getAllMovies,
};
