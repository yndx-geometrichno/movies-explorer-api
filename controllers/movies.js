const mongoose = require("mongoose");
const Movie = require("../models/movie");
const ApiError = require("../error/ApiError");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
    const newMovie = await Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id });
    return res.status(201).send(await newMovie.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        ApiError.invalid("Переданы некорректные данные при создании фильма")
      );
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId }).orFail(
      ApiError.notFound("Карточка с указанным _id не найдена.")
    );
    const movieOwnerId = movie.owner._id.toString();
    const userId = req.user._id;
    if (!movieOwnerId.includes(userId)) {
      return next(
        ApiError.forbidden("У вас недостаточно прав для удаления фильма")
      );
    }
    await movie.deleteOne();
    return res.status(200).send({ message: "Данный фильм удален успешно" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};