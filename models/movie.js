const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: {
        value: true,
        message: "Поле страна является обязательным",
      },
    },
    director: {
      type: String,
      required: {
        value: true,
        message: "Поле режиссер является обязательным",
      },
    },
    duration: {
      type: Number,
      required: {
        value: true,
        message: "Поле продолжительность является обязательным",
      },
    },
    year: {
      type: Number,
      required: {
        value: true,
        message: "Поле год является обязательным",
      },
    },
    description: {
      type: String,
      required: {
        value: true,
        message: "Поле описание является обязательным",
      },
    },
    image: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: "Некорректный URL",
      },
      required: {
        value: true,
        message: "Поле постер является обязательным",
      },
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: "Некорректный URL",
      },
      required: [true, "Поле трейлер является обязательным"],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: "Некорректный URL",
      },
      required: [true, "Поле тамбнейл является обязательным"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: {
        value: true,
        message: "Поле id фильма является обязательным",
      },
    },
    nameRu: {
      type: String,
      required: {
        value: true,
        message: "Поле имя является обязательным",
      },
    },
    nameEng: {
      type: String,
      required: {
        value: true,
        message: "Поле имя является обязательным",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("movie", movieSchema);
