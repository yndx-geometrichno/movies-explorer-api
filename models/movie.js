const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

// Правило для валидации URL
const urlValidator = {
  validator: (v) => isURL(v),
  message: "Некорректный URL",
}

// Функция для создания сообщения об ошибке
function getRequiredError(fieldName) {
  return `Поле ${fieldName} является обязательным`
}

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, getRequiredError("страна")],
    },
    director: {
      type: String,
      required: [true, getRequiredError("режиссер")],
    },
    duration: {
      type: Number,
      required: [true, getRequiredError("продолжительность")],
    },
    year: {
      type: Number,
      required: [true, getRequiredError("год")],
    },
    description: {
      type: String,
      required: [true, getRequiredError("описание")],
    },
    image: {
      type: String,
      validate: urlValidator,
      required: [true, getRequiredError("постер")],
    },
    trailerLink: {
      type: String,
      validate: urlValidator,
      required: [true, getRequiredError("трейлер")],
    },
    thumbnail: {
      type: String,
      validate: urlValidator,
      required: [true, getRequiredError("тамбнейл")],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, getRequiredError("id фильма")],
    },
    nameRu: {
      type: String,
      required: [true, getRequiredError("имя")],
    },
    nameEng: {
      type: String,
      required: [true, getRequiredError("имя")],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = model("movie", movieSchema);
