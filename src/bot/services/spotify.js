const { SpotifyClient } = require('node-spotify-api');
const { logger } = require('../../utils/logger');

/**
 * Service class for interacting with the Spotify API.
 */
class SpotifyService {
  /**
   * Constructor for the SpotifyService.
   * @param {string} clientId - The Spotify client ID.
   * @param {string} clientSecret - The Spotify client secret.
   */
  constructor(clientId, clientSecret) {
    this.client = new SpotifyClient({
      id: clientId,
      secret: clientSecret,
    });
  }

  /**
   * Searches for music on Spotify.
   * @param {string} query - The search query.
   * @returns {Promise<Array<object>>} - A Promise resolving to an array of search results.
   */
  async search(query) {
    try {
      const results = await this.client.search({
        q: query,
        type: 'track,album', // Search for tracks and albums
      });
      logger.info(`Spotify search completed for query: ${query}`);

      // Extract relevant data from the API response
      return results.tracks.items.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        url: track.external_urls.spotify, // Link to the track on Spotify
      }));
    } catch (error) {
      logger.error('Error during Spotify search:', error);
      throw error;
    }
  }
}

module.exports = { SpotifyService };