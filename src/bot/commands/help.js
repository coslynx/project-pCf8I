const { Telegraf } = require('telegraf');

/**
 * Handles the '/help' command, providing users with a list of available commands and functionalities.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const helpCommand = (ctx) => {
  ctx.replyWithHTML(
    `<b>Telegram Music Downloader Bot Help</b>
  This bot allows you to search for and download music in FLAC format from Spotify and Deezer.

  <b>Available Commands:</b>
  - <b>/start</b>: Starts the bot and displays a welcome message.
  - <b>/help</b>: Shows this help message.
  - <b>/search</b>: Searches for music on Spotify or Deezer based on your query.
  - <b>/download</b>: Downloads a track or album based on its ID.
  - <b>/history</b>: Displays your download history.
  - <b>/settings</b>: Allows you to adjust your preferences (e.g., download format, language).
  - <b>/about</b>: Displays information about the bot and its creators.

  <b>Example Usage:</b>
  - <b>/search "The Weeknd"</b>: Searches for music by The Weeknd.
  - <b>/download 20I6sIOMTCkB9w3TFz0rkA</b>: Downloads a track with ID 20I6sIOMTCkB9w3TFz0rkA.

  <b>Note:</b>
  - You can find track or album IDs on Spotify or Deezer URLs.
  - The bot prioritizes downloading music in FLAC format.
  - For more information or support, contact [Your Contact Information].`,
  );
};

module.exports = { helpCommand };