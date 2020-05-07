const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Request Method:', request.method);
  logger.info('Request Path:  ', request.path);
  logger.info('Request Body:  ', request.body);
  logger.info('------------------');
  next();
};

const unknownUrl = (request, response) => {
  response.status(404).send({ error: 'unknown url' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'bad id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownUrl,
  errorHandler,
};
