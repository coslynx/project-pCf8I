const { Telegraf } = require('telegraf');

/**
 * Handles the '/about' command, displaying information about the bot.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const aboutCommand = (ctx) => {
  ctx.replyWithHTML(
    `<b>Telegram Music Downloader Bot</b>
  This bot allows you to search for and download music in FLAC format from Spotify and Deezer.

  <b>Features:</b>
  - Music Search (Spotify & Deezer)
  - Download Music in FLAC Format
  - User-Friendly Interface

  <b>Created by:</b> [Your Name]

  <b>Contact:</b> [Your Contact Information]

  <b>Source Code:</b> [Your Repository Link]`,
  );
};

module.exports = { aboutCommand };