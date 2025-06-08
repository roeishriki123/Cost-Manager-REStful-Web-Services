const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

/**
 * Generates a monthly cost report for a specific user.
 *
 * @param {express.Request} req - Express request object
 * @param {number} req.query.id - The user ID
 * @param {number} req.query.year - The report year
 * @param {number} req.query.month - The report month (1–12)
 * @param {express.Response} res - Express response object
 *
 * @returns {Promise<void>} A JSON report containing categorized costs
 */
async function getMonthlyReport(req, res) {
    try {
        const id = parseInt(req.query.id);
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);

        // Check for missing query parameters
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing required query parameters: id, year, month' });
        }

        const fromDate = new Date(year, month - 1, 1);
        const toDate = new Date(year, month, 1);

        const costs = await Cost.find({
            userid: id,
            date: { $gte: fromDate, $lt: toDate }
        });

        const categories = ['food', 'health', 'housing', 'sport', 'education'];

        // Initialize an empty array for each category
        const groupedCosts = {};

        for (const category of categories) {
            groupedCosts[category] = [];
        }

        // Group each cost item by its category
        for (const cost of costs) {
            groupedCosts[cost.category].push({
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.date).getDate()
            });
        }

        const costsArray = categories.map(category => ({
            [category]: groupedCosts[category]
        }));

        // Construct the final report object
        const report = {
            userid: id,
            year,
            month,
            costs: costsArray
        };

        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Define the GET /report route and attach the handler
router.get('/report', getMonthlyReport);

module.exports = router;
