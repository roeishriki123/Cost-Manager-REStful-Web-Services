const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * Retrieves user information along with the total sum of their costs.
 *
 * @param {express.Request} req - Express request object
 * @param {string} req.params.id - User ID from the URL path
 * @param {express.Response} res - Express response object
 *
 * @returns {Promise<void>} A JSON object containing user details and total cost
 */
async function getUserWithTotalCost(req, res) {
    try {
        const userId = parseInt(req.params.id);

        // Find the user in the database by their ID
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const costs = await Cost.find({ userid: userId });

        // Calculate the total sum of all the user's costs
        const total = costs.reduce((sum, cost) => sum + cost.sum, 0);

        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Define a GET route with a dynamic user ID and attach the handler function
router.get('/:id', getUserWithTotalCost);

module.exports = router;
