const Twit = require('twit');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const bot = new Twit(config.twitterKeys);

console.log('Bot starting...');

const files = fs.readdirSync('./images')
      .map(file => {
        return path.join('./images', file);
      });

const filePath = files[Math.floor(Math.random() * files.length)];

const regex = new RegExp('images/s([0-9]+)e([0-9]+).png');
const matches = filePath.match(regex);

const fileData = fs.readFileSync(filePath, { encoding: 'base64' });

bot.post(
  'media/upload',
  { media_data: fileData },
  function (err, data, response) {
    bot.post(
      'statuses/update',
      {
        status: `Season ${matches[1]} - Episode ${matches[2]}`,
        media_ids: [data.media_id_string]
      },
      function (err, data, response) {
        console.log(data);
      }
    );
  }
);
