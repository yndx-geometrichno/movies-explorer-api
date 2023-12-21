const { Joi } = require("celebrate");

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const userSignupValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
};

const userLoginValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userIdValidation = {
  params: {
    userId: Joi.string().hex().length(24).required(),
  },
};

const updateUserInfoValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

const movieIdValidation = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.number().required(),
    movieId: Joi.string().hex().length(24),
    nameRu: Joi.string().required(),
    nameEng: Joi.string().required(),
  }),
};

module.exports = {
  userSignupValidation,
  userLoginValidation,
  userIdValidation,
  updateUserInfoValidation,
  movieIdValidation,
  createMovieValidation,
};
