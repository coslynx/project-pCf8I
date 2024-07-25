const { Telegraf } = require('telegraf');

/**
 * Middleware for handling errors and providing user-friendly responses.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 * @param {Error} error - The error object.
 */
const errorHandlingMiddleware = async (ctx, error) => {
  // Log the error for debugging purposes.
  console.error('Error:', error);

  // Send a user-friendly error message to the user.
  ctx.reply(
    'Oops! Something went wrong. Please try again later or contact the bot administrator for assistance.',
  );
};

module.exports = { errorHandlingMiddleware };