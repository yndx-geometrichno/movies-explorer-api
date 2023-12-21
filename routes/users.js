const router = require("express").Router();
const { celebrate } = require("celebrate");
const { getMe, updateUserInfo } = require("../controllers/users");
const { updateUserInfoValidation } = require("../utils/validationRules");

// возвращает информацию о пользователе (email и имя)
router.get("/me", getMe);

// обновляет информацию о пользователе (email и имя)
router.patch("/me", celebrate(updateUserInfoValidation), updateUserInfo);

module.exports = router;
