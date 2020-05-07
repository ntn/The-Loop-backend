const express = require('express');
const Twit = require('twit');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

const twitterClient = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET,
});

app.get('/', async (req, res) => {
  logger.info('reached home');
  const io = req.app.get('socketio');

  const result = await twitterClient.get('trends/place', { id: '23424775' });

  const { trends } = result.data[0];
  const filteredTrends = trends.filter((trend) => trend.tweet_volume !== null);
  const trendNames = [];

  filteredTrends.forEach((trend) => {
    trendNames.push(trend.name);
  });

  io.on('connection', (socket) => {
    io.emit('trendingHashtags', trendNames);
  });

  res.send(filteredTrends);
});

module.exports = app;
