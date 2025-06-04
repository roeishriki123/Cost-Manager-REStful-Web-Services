const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

// POST /api/add
router.post('/add', async (req, res) => {
    try {
        const { description, category, userid, sum, created_at } = req.body;

        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            created_at: created_at || Date.now()
        });

        const savedCost = await newCost.save();
        res.status(201).json(savedCost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
