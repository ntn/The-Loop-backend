const cors = require('cors');
const Twit = require('twit');
const express = require('express');
const config = require('./utils/config');

require('express-async-errors');
const middleware = require('./utils/middleware');
const twitterRouter = require('./controllers/twitter');

const twitterClient = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET,
});

const expressApp = async (app) => {
  app.use(cors());
  app.use(express.static('build'));
  app.use(middleware.requestLogger);
  app.use('/twitter', twitterRouter);

  const io = app.get('socketio');
  const result = await twitterClient.get('search/tweets', { q: '#coronavirus', count: 2 });
  const { statuses } = result.data;

  io.on('connection', async (socket) => {
    io.emit('initialTweets', statuses);

    const tweetStream = twitterClient.stream('statuses/filter', { track: '#coronavirus', language: 'en' });
    tweetStream.on('tweet', (newTweet) => {
      io.emit('newTweet', { newTweet });
    });
  });

  app.use(middleware.unknownUrl);
  app.use(middleware.errorHandler);
};

module.exports = expressApp;
