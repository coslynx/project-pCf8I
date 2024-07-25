require('dotenv').config();

module.exports = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  DEEZER_APP_ID: process.env.DEEZER_APP_ID,
  DEEZER_APP_SECRET: process.env.DEEZER_APP_SECRET,
};