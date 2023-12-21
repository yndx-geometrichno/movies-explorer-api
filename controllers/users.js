const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const ApiError = require("../error/ApiError");

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SECRET_KEY = "development-secret-key"

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashPass = await bcrypt.hash(String(password), 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    const userWithoutPassword = newUser.toObject({
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign
        delete ret.password;
        return ret;
      },
    });

    return res.status(201).send({ newUser: userWithoutPassword });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        ApiError.invalid(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(
        ApiError.conflict("Пользователь с таким Email уже зарегистрирован")
      );
    }

    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    if (user.status === 401) {
      throw ApiError.unauthorized(`Неправильные почта или пароль`);
    }
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .cookie("token", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: true,
      })
      .send({ user });
    return user;
  } catch (err) {
    return next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail(
      ApiError.notFound("Пользователь по указанному _id не найден")
    );
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { email, name } },
      { new: true, runValidators: true }
    ).orFail(ApiError.notFound("Пользователь по указанному _id не найден"));
    return res.send(updateUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        ApiError.invalid("Переданы некорректные данные при обновлении аватара.")
      );
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  getMe,
  updateUserInfo,
};