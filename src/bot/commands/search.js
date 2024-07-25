const { Telegraf } = require('telegraf');
const { spotifyService, deezerService } = require('../../bot/services');

/**
 * Handles the '/search' command, allowing users to search for music.
 * @param {Telegraf.Context} ctx - The Telegraf context object.
 */
const searchCommand = async (ctx) => {
  try {
    // Prompt the user for the search query.
    ctx.reply('🔍 Please enter your search query:');

    // Wait for the user's response.
    const message = await ctx.telegram.onMessage(ctx.update.message.message_id);

    // Extract the query from the user's message.
    const query = message.text;

    // Validate the provided query.
    if (!query) {
      ctx.reply('Invalid query. Please provide a search query.');
      return;
    }

    // Determine the preferred streaming service (Spotify or Deezer).
    // You can implement logic here to determine the user's preference,
    // such as using a settings menu or defaulting to a specific service.
    const preferredService = 'spotify'; // Example: Default to Spotify

    // Call the appropriate search function based on the preferred service.
    let searchResults;
    if (preferredService === 'spotify') {
      searchResults = await spotifyService.search(query);
    } else if (preferredService === 'deezer') {
      searchResults = await deezerService.search(query);
    } else {
      ctx.reply('Invalid service selection. Please try again.');
      return;
    }

    // Format and display the search results.
    if (searchResults.length === 0) {
      ctx.reply('No results found for your query.');
    } else {
      const formattedResults = searchResults
        .map((result) => {
          // Format each result based on the API response structure.
          return `- ${result.title} by ${result.artist}`;
        })
        .join('\n');

      ctx.reply(`Search Results:\n${formattedResults}`);
    }
  } catch (error) {
    console.error('Error during search command:', error);
    ctx.reply('An error occurred. Please try again later.');
  }
};

module.exports = { searchCommand };