const twitterRouter = require('express').Router();
const Twit = require('twit');
const config = require('../utils/config');

const twitterClient = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET,
});

twitterRouter.get('/trending', async (req, res) => {
  const result = await twitterClient.get('trends/place', { id: '23424775' });

  const { trends } = result.data[0];
  const filteredTrends = trends.filter((trend) => trend.tweet_volume !== null);
  const trendNames = [];

  filteredTrends.forEach((trend) => {
    trendNames.push(trend.name);
  });

  res.send(filteredTrends);
});

twitterRouter.get('/tweets/:searchQuery', async (req, res) => {
  const result = await twitterClient.get('search/tweets', { q: `#${req.params.searchQuery}`, count: 20 });

  const { statuses } = result.data;

  res.send(statuses);
});

module.exports = twitterRouter;
