// Import the mongoose library to define a schema and interact with MongoDB
const mongoose = require('mongoose');

/**
 * @typedef {Object} Cost
 * @property {string} description - Description of the cost item
 * @property {string} category - Category of the cost (food, health, housing, sport, education)
 * @property {number} userid - The user ID associated with the cost
 * @property {number} sum - The amount of the cost
 * @property {Date} [date] - The date of the cost (default: now)
 */

// Define a Mongoose schema for the Cost model
const costSchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['food', 'health', 'housing', 'sport', 'education']
    },
    userid: { type: Number, required: true },
    sum: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cost', costSchema);
