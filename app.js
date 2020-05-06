const express = require('express');
const logger = require('./utils/logger');

const app = express();

app.get('/', (req, res) => {
  logger.info('reached home');
  res.send('hello world');
});

module.exports = app;
