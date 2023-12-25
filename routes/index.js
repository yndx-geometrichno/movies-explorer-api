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
const {
  logoutSuccess,
  pageNotFound,
} = require("../utils/messageServerResponse");

router.post("/signup", celebrate(userSignupValidation), createUser);
router.post("/signin", celebrate(userLoginValidation), login);
router.post("/signout", auth, (req, res) => {
  res.clearCookie("token").send({ message: logoutSuccess });
});
router.use("/users", auth, userRouter);
router.use("/movies", auth, movieRouter);
router.use("*", auth, (req, res, next) =>
  next(ApiError.notFound(pageNotFound))
);

module.exports = router;
