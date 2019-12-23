// listen on port so now.sh likes it
const { createServer } = require('http');

const Twit = require('twit');
const config = require('./config');
const fs = require('fs');

const bot = new Twit(config.twitterKeys);

console.log('Bot starting...');

// setInterval(retweet, config.twitterConfig.retweet);

const fileData = fs.readFileSync('./images/s1e1.png', { encoding: 'base64' });

bot.post(
  'media/upload',
  { media_data: fileData },
  function (err, data, response) {
    bot.post(
      'statuses/update',
      { status: 'Season 1 - Episode 1', media_ids: [data.media_id_string] },
      function (err, data, response) {
        console.log(data);
      }
    );
  }
);

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  });
  res.end();
});

server.listen(3000);
