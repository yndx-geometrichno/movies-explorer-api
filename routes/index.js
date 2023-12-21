const router = require("express").Router();
const { celebrate } = require("celebrate");
const userRouter = require("./users");
const movieRouter = require("./movies");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");
const ApiError = require("../error/ApiError");
const {
  userSignupValidation,
  userLoginValidation,
} = require("../utils/validationRules");

// router.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Сервер сейчас упадет");
//   }, 0);
// });

router.post("/signup", celebrate(userSignupValidation), createUser);
router.post("/signin", celebrate(userLoginValidation), login);
router.post("/signout", (req, res) => {
  res.clearCookie("token").send({ message: "Вы вышли из профиля" });
});
router.use("/users", auth, userRouter);
router.use("/movies", auth, movieRouter);
router.use("*", auth, (req, res, next) =>
  next(ApiError.notFound("This page is not exist"))
);

module.exports = router;
