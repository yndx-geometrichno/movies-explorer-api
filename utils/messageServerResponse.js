// Сообщения об операциях с User
const invalidUserData =
  "Переданы некорректные данные при создании пользователя.";
const emailAlreadyExist = "Пользователь с таким Email уже зарегистрирован.";
const wrongEmailOrPassword = "Неправильные почта или пароль.";
const userIdNotFound = "Пользователь по указанному _id не найден.";
const invalidUserDataUpdate =
  "Переданы некорректные данные при обновлении почты или пароля.";
const logoutSuccess = "Вы вышли из профиля";
const userUnauthorized = "Пользователь не авторизован";

// Сообщения об операциях с Movie
const invalidMovieData = "Переданы некорректные данные при создании фильма";
const movieIdNotFound = "Фильм с указанным _id не найден.";
const differentOwnerMovieDelete = "У вас недостаточно прав для удаления фильма";
const movieDeleteDone = "Данный фильм удален успешно";
const invalidMovieId = "Передан некорректный ID фильма";

const pageNotFound = "Данная страница не найдена";

const serverSideError = "Unexpected server side error";

const incorrectUrl = "Некорректный URL";

const invalidErrCode = 400;
const unauthorizedErrCode = 401;
const forbiddenErrCode = 403;
const notFoundErrCode = 404;
const conflictErrCode = 409;


// Функция для создания сообщения об ошибке в данных фильмов
function getRequiredError(fieldName) {
  return `Поле ${fieldName} является обязательным`;
}

module.exports = {
  invalidUserData,
  emailAlreadyExist,
  wrongEmailOrPassword,
  userIdNotFound,
  invalidUserDataUpdate,
  logoutSuccess,
  userUnauthorized,
  invalidMovieData,
  movieIdNotFound,
  differentOwnerMovieDelete,
  movieDeleteDone,
  invalidMovieId,
  pageNotFound,
  serverSideError,
  incorrectUrl,
  getRequiredError,
  invalidErrCode,
  unauthorizedErrCode,
  forbiddenErrCode,
  notFoundErrCode,
  conflictErrCode
};
