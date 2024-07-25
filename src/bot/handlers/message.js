const { Telegraf } = require('telegraf');
const { searchCommand } = require('../commands/search');
const { downloadCommand } = require('../commands/download');
const { historyCommand } = require('../commands/history');
const { settingsCommand } = require('../commands/settings');
const { aboutCommand } = require('../commands/about');

/**
 * Handles incoming text messages from users, analyzing their content and directing them to the appropriate handler.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const messageHandler = async (ctx) => {
  try {
    const message = ctx.message.text;

    if (!message) {
      return;
    }

    if (message.startsWith('/search')) {
      searchCommand(ctx);
    } else if (message.startsWith('/download')) {
      downloadCommand(ctx);
    } else if (message.startsWith('/history')) {
      historyCommand(ctx);
    } else if (message.startsWith('/settings')) {
      settingsCommand(ctx);
    } else if (message.startsWith('/about')) {
      aboutCommand(ctx);
    } else {
      ctx.reply('Invalid command. Please use one of the following commands:\n/help, /search, /download, /history, /settings, /about');
    }
  } catch (error) {
    console.error('Error during message handling:', error);
    ctx.reply('An error occurred. Please try again later.');
  }
};

module.exports = { messageHandler };