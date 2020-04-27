const Status = require('http-status');

const errors = {

  // Default Errors
  ValidationError: {
    statusCode: Status.BAD_REQUEST,
    errorCode: 'VALIDATION_ERROR',
  },
  InternalServerError: {
    statusCode: Status.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'The server failed to handle this request',
  },
  NotFoundError: {
    statusCode: Status.NOT_FOUND,
    errorCode: 'NOT_FOUND',
  },
};

module.exports.config = errors;
module.exports.types = Object.keys(errors).reduce((acc, val) => {
  acc[val] = val;
  return acc;
}, {});
