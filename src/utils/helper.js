const { DOWNLOAD_FORMAT } = require('./constants');

/**
 * Generates a file path for a downloaded audio file based on user ID and track/album ID.
 * @param {number} userId - The ID of the user initiating the download.
 * @param {string} trackId - The ID of the track or album being downloaded.
 * @returns {string} - The file path for the downloaded audio file.
 */
const generateFilePath = (userId, trackId) => {
  return `downloads/${userId}/${trackId}.${DOWNLOAD_FORMAT}`;
};

module.exports = {
  generateFilePath,
};