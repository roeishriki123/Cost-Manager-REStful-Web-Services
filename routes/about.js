const express = require('express');
const router = express.Router();

// GET /api/about
router.get('/', (req, res) => {
    res.json([
        { first_name: "Roei", last_name: "Shriki" },
        { first_name: "Adam", last_name: "Ayalon" },
    ]);
});

module.exports = router;
