const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

// GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const costs = await Cost.find({ userid: userId });
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
});

module.exports = router;
