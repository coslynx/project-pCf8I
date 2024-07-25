const { Telegraf } = require('telegraf');
const { downloadService } = require('../../bot/services');

/**
 * Handles callback queries from inline menus or other interactive elements.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const callbackQueryHandler = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data;

    // Check if the data is a download request.
    if (data.startsWith('download:')) {
      const id = data.split(':')[1];

      // Initiate the download process.
      const downloadResult = await downloadService.start(id, ctx.from.id);

      // Provide feedback to the user.
      if (downloadResult.success) {
        ctx.reply(`Download started!`);
      } else {
        ctx.reply(`An error occurred while starting the download.`);
      }
    } else {
      // Handle other callback query data (e.g., settings, pagination).
      // Implement logic here based on your specific needs.
      // You can use ctx.editMessageText() to update the message.
    }
  } catch (error) {
    console.error('Error during callback query:', error);
    ctx.reply('An error occurred. Please try again later.');
  }
};

module.exports = { callbackQueryHandler };