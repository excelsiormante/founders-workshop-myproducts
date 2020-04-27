
/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger, utils, config } = req.container.cradle;

  let error = err;

  if (!(err instanceof utils.ErrorBuilder)) {
    error = new utils.ErrorBuilder(err);
  }
  const {
    statusCode, errorCode, message, details, stack, name,
  } = error;

  const response = {
    statusCode,
    message,
    error: {
      type: name,
      code: errorCode,
      details,
    },
  };

  if (config.env === 'development') {
    response.error.stack = stack;
  }

  logger.error(response);

  res.status(statusCode).json(response);
};
