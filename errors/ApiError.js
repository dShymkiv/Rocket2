const { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, SERVER_ERROR } = require("./error.codes");

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = SERVER_ERROR;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
  }
}

module.exports = {
  ApiError,
  Conflict,
  Unauthorized,

  BadRequest,
  Forbidden,
  NotFound,
  ServerError
};
