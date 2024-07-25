const { DeezerClient } = require('deezer-node');
const { logger } = require('../../utils/logger');

/**
 * Service class for interacting with the Deezer API.
 */
class DeezerService {
  /**
   * Constructor for the DeezerService.
   * @param {string} appId - The Deezer app ID.
   * @param {string} appSecret - The Deezer app secret.
   */
  constructor(appId, appSecret) {
    this.client = new DeezerClient({
      app_id: appId,
      app_secret: appSecret,
    });
  }

  /**
   * Searches for music on Deezer.
   * @param {string} query - The search query.
   * @returns {Promise<Array<object>>} - A Promise resolving to an array of search results.
   */
  async search(query) {
    try {
      const results = await this.client.search({ q: query });
      logger.info(`Deezer search completed for query: ${query}`);
      return results.data.data.map((result) => ({
        id: result.id,
        title: result.title,
        artist: result.artist.name,
        album: result.album.title,
        url: result.link, // Link to the track on Deezer
      }));
    } catch (error) {
      logger.error('Error during Deezer search:', error);
      throw error;
    }
  }
}

module.exports = { DeezerService };