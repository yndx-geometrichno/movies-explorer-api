const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const validator = require("validator");
const ApiError = require('../error/ApiError');
const { wrongEmailOrPassword } = require("../utils/messageServerResponse");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} - это некорректный Email`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password").lean();
  if (!user) {
    return ApiError.unauthorized(wrongEmailOrPassword);
  }
  return bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) {
      return ApiError.unauthorized(wrongEmailOrPassword);
    }
    delete user.password;
    return user;
  });
};

module.exports = model("user", userSchema);
