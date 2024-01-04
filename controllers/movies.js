const mongoose = require("mongoose");
const Movie = require("../models/movie");
const ApiError = require("../error/ApiError");
const {
  invalidMovieData,
  movieIdNotFound,
  differentOwnerMovieDelete,
  movieDeleteDone,
  invalidMovieId,
} = require("../utils/messageServerResponse");

const getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id)
    const savedMovies = await Movie.find({ _id });
    console.log(savedMovies)
    return res.send(savedMovies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    return res.status(201).send(await newMovie.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(ApiError.invalid(invalidMovieData));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId }).orFail(
      ApiError.notFound(movieIdNotFound)
    );
    const movieOwnerId = movie.owner._id.toString();
    const userId = req.user._id;
    if (!movieOwnerId.includes(userId)) {
      return next(ApiError.forbidden(differentOwnerMovieDelete));
    }
    await movie.deleteOne();
    return res.status(200).send({ message: movieDeleteDone });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid(invalidMovieId));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
