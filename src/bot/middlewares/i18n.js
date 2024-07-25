const { Telegraf } = require('telegraf');
const { telegrafI18n } = require('telegraf-i18n');

/**
 * Middleware for internationalization and localization.
 * Loads language files and sets the user's language based on their preferences.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 * @param {Function} next - The next middleware function in the chain.
 */
const i18nMiddleware = (ctx, next) => {
  // Load language files from the 'locales' directory.
  ctx.i18n.use(telegrafI18n.use({
    directory: './locales',
  }));

  // Set the default language to 'en'.
  ctx.i18n.locale('en');

  // Check if the user's preferred language is stored in the session.
  if (ctx.session.language) {
    ctx.i18n.locale(ctx.session.language);
  }

  // Call the next middleware function in the chain.
  next();
};

module.exports = { i18nMiddleware };