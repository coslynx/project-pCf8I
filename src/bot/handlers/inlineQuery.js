const { Telegraf } = require('telegraf');
const { spotifyService, deezerService } = require('../../bot/services');

/**
 * Handles inline queries, displaying search results from Spotify and Deezer.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const inlineQueryHandler = async (ctx) => {
  try {
    const query = ctx.inlineQuery.query;

    // Validate the query.
    if (!query) {
      return;
    }

    // Search Spotify.
    const spotifyResults = await spotifyService.search(query);

    // Search Deezer.
    const deezerResults = await deezerService.search(query);

    // Format search results.
    const results = [
      ...spotifyResults.map((result) => ({
        type: 'article',
        id: result.id,
        title: result.title,
        description: `by ${result.artist} (Spotify)`,
        input_message_content: {
          message_text: `- ${result.title} by ${result.artist} (Spotify)`,
        },
      })),
      ...deezerResults.map((result) => ({
        type: 'article',
        id: result.id,
        title: result.title,
        description: `by ${result.artist} (Deezer)`,
        input_message_content: {
          message_text: `- ${result.title} by ${result.artist} (Deezer)`,
        },
      })),
    ];

    // Send results to Telegram.
    await ctx.answerInlineQuery(results);
  } catch (error) {
    console.error('Error during inline query:', error);
  }
};

module.exports = { inlineQueryHandler };