require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const costRoutes = require('./routes/costs');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');
const aboutRoute = require('./routes/about');

const app = express();

/**
 * Initializes the application.
 *
 * - Connects to MongoDB
 * - Parses incoming JSON requests
 * - Sets up route handlers under `/api` and `/api/users`
 */

// Establish connection to MongoDB
connectDB();
app.use(express.json());

// Routs
app.use('/api', costRoutes);
app.use('/api', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/about', aboutRoute);

/**
 * Starts the server on the configured port (default: 5000)
 * Only runs when the app is executed directly.
 */
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
