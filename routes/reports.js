const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

// GET /api/report
router.get('/report', async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);

        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing required query parameters: id, year, month' });
        }

        const fromDate = new Date(year, month - 1, 1);
        const toDate = new Date(year, month, 1);

        const costs = await Cost.find({
            userid: id,
            created_at: { $gte: fromDate, $lt: toDate }
        });

        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        const groupedCosts = {};

        for (const category of categories) {
            groupedCosts[category] = [];
        }

        for (const cost of costs) {
            groupedCosts[cost.category].push({
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.created_at).getDate()
            });
        }

        const costsArray = categories.map(category => ({
            [category]: groupedCosts[category]
        }));

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
});

module.exports = router;
