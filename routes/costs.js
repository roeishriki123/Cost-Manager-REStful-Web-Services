const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

/**
 * Adds a new cost item to the database.
 *
 * @param {express.Request} req - Express request object containing the cost data
 * @param {express.Response} res - Express response object
 * @returns {Promise<void>}
 */
async function addCost(req, res) {
    try {
        const { description, category, userid, sum, date } = req.body;

        // Check for missing required fields
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date || undefined
        });

        const savedCost = await newCost.save();
        res.status(201).json(savedCost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Define a POST route to handle cost addition
router.post('/add', addCost);

module.exports = router;
