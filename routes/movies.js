const router = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");
const {
  movieIdValidation,
  createMovieValidation,
} = require("../utils/validationRules");

// возвращает все сохранённые текущим пользователем фильмы
router.get("/", getMovies);

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post("/", celebrate(createMovieValidation), createMovie);

// удаляет сохранённый фильм по id
router.delete("/:cardId", celebrate(movieIdValidation), deleteMovie);

module.exports = router;
