const http = require('http');
// const app = require('./app');
const app = require('express')();

const server = http.createServer(app);

// eslint-disable-next-line import/order
const io = require('socket.io')(server);

app.set('socketio', io);

require('./app.js')(app);

const config = require('./utils/config');
const logger = require('./utils/logger');


server.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`);
});
