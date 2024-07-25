const { Telegraf } = require('telegraf');
const { downloadService } = require('../../bot/services');

/**
 * Handles the '/download' command, initiating the download process for a track or album.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const downloadCommand = async (ctx) => {
  try {
    // Prompt the user for the track or album ID.
    ctx.reply('Please provide the track or album ID you want to download:');

    // Wait for the user's response.
    const response = await ctx.replyWithHTML(
      `<b>Example:</b>\nTrack ID: <a href="https://open.spotify.com/track/20I6sIOMTCkB9w3TFz0rkA">20I6sIOMTCkB9w3TFz0rkA</a>\nAlbum ID: <a href="https://open.spotify.com/album/20I6sIOMTCkB9w3TFz0rkA">20I6sIOMTCkB9w3TFz0rkA</a>`,
    );

    // Listen for the user's response.
    const message = await ctx.telegram.onMessage(response.message_id);

    // Extract the ID from the user's message.
    const id = message.text;

    // Validate the provided ID.
    if (!id) {
      ctx.reply('Invalid ID. Please provide a valid track or album ID.');
      return;
    }

    // Initiate the download process.
    const downloadResult = await downloadService.start(id, ctx.from.id);

    // Provide feedback to the user.
    if (downloadResult.success) {
      ctx.reply(`Download started!`);
    } else {
      ctx.reply(`An error occurred while starting the download.`);
    }
  } catch (error) {
    console.error('Error during download command:', error);
    ctx.reply('An error occurred. Please try again later.');
  }
};

module.exports = { downloadCommand };