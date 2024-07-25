const Telegraf = require('telegraf');
const { telegrafI18n } = require('telegraf-i18n');
const session = require('telegraf-session');
const { Stage } = require('telegraf');
const Scene = require('telegraf/scenes/base');
const { inlineMenu } = require('telegraf-inline-menu');
const {
  TELEGRAM_BOT_TOKEN,
  MONGO_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  DEEZER_APP_ID,
  DEEZER_APP_SECRET,
} = require('./config');
const { logger } = require('./utils');
const {
  startCommand,
  helpCommand,
  searchCommand,
  downloadCommand,
  historyCommand,
  settingsCommand,
  aboutCommand,
} = require('./bot/commands');
const { messageHandler, callbackQueryHandler } = require('./bot/handlers');
const {
  SpotifyService,
  DeezerService,
  DownloadService,
  DatabaseService,
} = require('./bot/services');

// Create a new Telegraf instance
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Initialize i18n middleware
const i18n = new telegrafI18n({
  defaultLanguage: 'en',
  directory: './locales',
  useSession: true,
});

// Initialize session middleware
bot.use(session());

// Initialize i18n middleware
bot.use(i18n.middleware());

// Initialize services
const spotifyService = new SpotifyService(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
const deezerService = new DeezerService(DEEZER_APP_ID, DEEZER_APP_SECRET);
const downloadService = new DownloadService();
const databaseService = new DatabaseService(MONGO_URI);

// Initialize bot commands
bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('search', searchCommand);
bot.command('download', downloadCommand);
bot.command('history', historyCommand);
bot.command('settings', settingsCommand);
bot.command('about', aboutCommand);

// Initialize handlers
bot.on('message', messageHandler);
bot.on('callback_query', callbackQueryHandler);

// Start the bot
bot.launch().then(() => {
  logger.info('Telegram Music Downloader Bot started successfully.');
}).catch((err) => {
  logger.error('Error starting bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));