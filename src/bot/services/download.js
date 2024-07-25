const axios = require('axios');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const { logger } = require('../../utils/logger');
const { databaseService } = require('./database');
const { DOWNLOAD_FORMAT } = require('../../utils/constants');

/**
 * Service class for handling music downloads.
 */
class DownloadService {
  /**
   * Constructor for the DownloadService.
   */
  constructor() {
    this.downloadQueue = [];
    this.isDownloading = false;
  }

  /**
   * Starts the download process for a track or album.
   * @param {string} id - The track or album ID to download.
   * @param {number} userId - The ID of the user initiating the download.
   * @returns {Promise<object>} - A Promise resolving to an object indicating the download status.
   */
  async start(id, userId) {
    try {
      // Add the download request to the queue.
      this.downloadQueue.push({ id, userId });

      // Start the download process if not already downloading.
      if (!this.isDownloading) {
        this.isDownloading = true;
        await this.processDownloadQueue();
      }

      return { success: true };
    } catch (error) {
      logger.error('Error starting download:', error);
      return { success: false };
    }
  }

  /**
   * Processes the download queue, handling downloads one by one.
   */
  async processDownloadQueue() {
    while (this.downloadQueue.length > 0) {
      const { id, userId } = this.downloadQueue.shift();

      try {
        // Download the audio stream.
        const stream = await this.getAudioStream(id);

        // Save the downloaded audio file.
        const downloadPath = await this.saveAudioFile(stream, id, userId);

        // Record the download in the database.
        await databaseService.recordDownload(userId, {
          title: stream.title,
          artist: stream.artist,
          album: stream.album,
          format: DOWNLOAD_FORMAT,
          downloadPath,
        });

        logger.info(`Download completed for ${id} by user ${userId}.`);
      } catch (error) {
        logger.error('Error during download process:', error);
        // Handle download errors gracefully (e.g., retry, send error message to user).
      }
    }

    this.isDownloading = false;
  }

  /**
   * Retrieves the audio stream for the given track or album ID.
   * @param {string} id - The track or album ID.
   * @returns {Promise<object>} - A Promise resolving to the audio stream.
   */
  async getAudioStream(id) {
    // Implement logic to fetch the audio stream based on the ID and preferred service (Spotify/Deezer).
    // This may involve making API requests using axios or other libraries.

    // Example using Spotify API:
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`);
      const { name: title, artists, album } = response.data;
      const artist = artists.map((artist) => artist.name).join(', ');
      return { title, artist, album };
    } catch (error) {
      logger.error('Error fetching audio stream:', error);
      throw error;
    }
  }

  /**
   * Saves the downloaded audio file to a specified location.
   * @param {object} stream - The audio stream.
   * @param {string} id - The track or album ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<string>} - A Promise resolving to the download path.
   */
  async saveAudioFile(stream, id, userId) {
    try {
      const downloadPath = `downloads/${userId}/${id}.${DOWNLOAD_FORMAT}`;
      const writeStream = ytdl(stream.url, { filter: 'audioonly' }).pipe(ffmpeg({ source: '-' }).format(DOWNLOAD_FORMAT).save(downloadPath));

      return new Promise((resolve, reject) => {
        writeStream.on('end', () => resolve(downloadPath));
        writeStream.on('error', (error) => reject(error));
      });
    } catch (error) {
      logger.error('Error saving audio file:', error);
      throw error;
    }
  }
}

module.exports = { DownloadService };