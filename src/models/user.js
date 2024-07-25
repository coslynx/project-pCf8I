const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true,
  },
  settings: {
    type: Object,
    default: {
      downloadFormat: 'flac', // Default download format
      language: 'en', // Default language
      // Add other settings as needed
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;