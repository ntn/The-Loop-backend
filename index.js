const express = require('express');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
