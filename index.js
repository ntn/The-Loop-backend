const http = require('http');
const app = require('./app');

const server = http.createServer(app);

// eslint-disable-next-line import/order
const io = require('socket.io')(server);
const config = require('./utils/config');
const logger = require('./utils/logger');

app.set('socketio', io);

server.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`);
});
