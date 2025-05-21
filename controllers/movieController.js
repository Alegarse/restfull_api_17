const movieModel = require("../models/moviesModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    await movieModel.create(newMovie);
    res.status(200).send("La película se ha creado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Endpoint apra filtar por titulo, categoria y paginar con limite
const getAllMovies = async (req, res) => {
  try {
    const { title, category, rating, page = 1, limit = 10 } = req.query;

    const filters = {};

    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }

    if (category) {
      const categoryArray = category.split(",");
      filters.category = { $in: categoryArray };
    }

    if (rating) {
      filters.rating = { $gt: parseFloat(rating) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await movieModel.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const movies = await movieModel
      .find(filters)
      .skip(skip)
      .limit(parseInt(limit));

    if (movies.length === 0) {
      return res.status(200).send("La peli no se encuentra");
    }

    res.status(200).send({
      status: "Success",
      data: movies,
      currentPage: parseInt(page),
      totalPages,
    });
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

const setCommentToMovie = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No hay películas por ese Id");
    }
    const comment = req.body.comment;
    const idUser = req.payload._id;

    const commentObject = {
      userId: idUser,
      comment: comment,
    };
    movie.comments.push(commentObject);
    movie.save();
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteCommentToMovie = async (req, res) => {
  try {
    const { idMovie, idComment } = req.params;
    const movie = await movieModel.findById(idMovie);
    if (!movie) {
      return res.status(200).send("No hay películas por ese Id");
    }
    if (!movie.comments.includes(idComment)) {
      return res.status(200).send("La película no tiene este comentario");
    }

    movie.comments.pull(idComment);
    movie.save();
    res.status(200).send({ status: "Success", data: movie });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getCountMoviesCategory = async (req, res) => {
  try {
    const movies = await movieModel.aggregate([
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category",
          cantidad: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          categoria: "$_id",
          cantidad: 1,
        },
      },
    ]);
    if (movies.length === 0) {
      return res.status(200).send("No hay películas");
    }
    res.status(200).send({ status: "Success", data: movies });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Query params

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  removeMovieById,
  updateMovieById,
  getCountMoviesCategory,
  setCommentToMovie,
  deleteCommentToMovie,
};
