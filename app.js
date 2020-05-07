const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

require('express-async-errors');
const middleware = require('./utils/middleware');
const twitterRouter = require('./controllers/twitter');

const app = express();

app.use(cors());
// app.use(express.static('build'));
// app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use('/twitter', twitterRouter);

app.use(middleware.unknownUrl);
app.use(middleware.errorHandler);


module.exports = app;
