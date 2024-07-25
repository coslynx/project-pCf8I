const { Telegraf } = require('telegraf');

/**
 * Handles the '/start' command, providing users with a welcome message.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const startCommand = (ctx) => {
  ctx.replyWithHTML(
    `👋 Welcome to the Telegram Music Downloader Bot!

This bot lets you search and download music in FLAC format from Spotify and Deezer.

To get started, use the following commands:

- /help: Get help with available commands and functionalities.
- /search: Search for music on Spotify or Deezer.
- /download: Download a track or album based on its ID.
- /history: View your download history.
- /settings: Adjust your preferences (e.g., download format, language).
- /about: Learn more about the bot and its creators.

Enjoy high-quality music downloads!`,
  );
};

module.exports = { startCommand };