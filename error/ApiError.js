const {
  invalidErrCode,
  unauthorizedErrCode,
  forbiddenErrCode,
  notFoundErrCode,
  conflictErrCode
} = require('../utils/messageServerResponse')

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static invalid(message) {
    return new ApiError(invalidErrCode, message);
  }

  static unauthorized(message) {
    return new ApiError(unauthorizedErrCode, message);
  }

  static forbidden(message) {
    return new ApiError(forbiddenErrCode, message);
  }

  static notFound(message) {
    return new ApiError(notFoundErrCode, message);
  }

  static conflict(message) {
    return new ApiError(conflictErrCode, message);
  }
}

module.exports = ApiError;
