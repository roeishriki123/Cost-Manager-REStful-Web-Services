// Import the mongoose library to define schemas and interact with MongoDB
const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {number} id - Internal user ID (used in costs and reports)
 * @property {string} first_name - First name of the user
 * @property {string} last_name - Last name of the user
 * @property {Date} [birthday] - Optional birthday
 * @property {string} [marital_status] - Optional marital status
 */

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: false },
    marital_status: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
