// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the connection string from the environment variable `MONGO_URI`.
 *
 * @async
 * @function connectDB
 * @throws Will throw an error if `MONGO_URI` is not defined or if the connection fails.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI not defined');
        await mongoose.connect(uri);
        console.log('MongoDB connected!');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    }
};

module.exports = connectDB;
