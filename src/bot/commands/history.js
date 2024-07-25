const { Telegraf } = require('telegraf');
const { databaseService } = require('../../bot/services');

/**
 * Handles the '/history' command, displaying the user's download history.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const historyCommand = async (ctx) => {
  try {
    const downloadHistory = await databaseService.getDownloadHistory(ctx.from.id);

    if (downloadHistory.length === 0) {
      ctx.reply('You have no download history yet.');
      return;
    }

    const historyMessage = downloadHistory
      .map((download) => {
        return `- ${download.title} by ${download.artist} (${download.format})`;
      })
      .join('\n');

    ctx.reply(`Your Download History:\n${historyMessage}`);
  } catch (error) {
    console.error('Error fetching download history:', error);
    ctx.reply('An error occurred while retrieving your download history.');
  }
};

module.exports = { historyCommand };