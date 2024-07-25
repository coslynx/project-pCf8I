const mongoose = require('mongoose');
const User = require('../../models/user');
const Download = require('../../models/download');

/**
 * Service class for database interactions.
 */
class DatabaseService {
  /**
   * Constructor for the DatabaseService.
   * @param {string} mongoURI - The URI for connecting to MongoDB.
   */
  constructor(mongoURI) {
    this.mongoURI = mongoURI;
    this.connect();
  }

  /**
   * Connects to the MongoDB database.
   */
  async connect() {
    try {
      await mongoose.connect(this.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  /**
   * Saves user settings to the database.
   * @param {number} userId - The ID of the user.
   * @param {object} settings - The user's settings.
   */
  async saveSettings(userId, settings) {
    try {
      const user = await User.findOneAndUpdate(
        { telegramId: userId },
        { settings },
        { upsert: true, new: true },
      );
      return user;
    } catch (error) {
      console.error('Error saving user settings:', error);
      return null;
    }
  }

  /**
   * Retrieves user settings from the database.
   * @param {number} userId - The ID of the user.
   */
  async getUserSettings(userId) {
    try {
      const user = await User.findOne({ telegramId: userId });
      return user ? user.settings : null;
    } catch (error) {
      console.error('Error retrieving user settings:', error);
      return null;
    }
  }

  /**
   * Records a download in the database.
   * @param {number} userId - The ID of the user.
   * @param {object} downloadData - The data for the downloaded track/album.
   */
  async recordDownload(userId, downloadData) {
    try {
      const download = new Download({
        userId,
        ...downloadData,
      });
      await download.save();
      return download;
    } catch (error) {
      console.error('Error recording download:', error);
      return null;
    }
  }

  /**
   * Retrieves the download history for a user.
   * @param {number} userId - The ID of the user.
   */
  async getDownloadHistory(userId) {
    try {
      const downloads = await Download.find({ userId });
      return downloads;
    } catch (error) {
      console.error('Error retrieving download history:', error);
      return [];
    }
  }
}

module.exports = { DatabaseService };