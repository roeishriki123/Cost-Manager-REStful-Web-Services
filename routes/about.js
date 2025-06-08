const express = require('express');
const router = express.Router();

/**
 * Returns information about the developers of the project.
 *
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @returns {void}
 */
function getAbout(req, res) {
    // Send a JSON response with a list of developers' names
    res.json([
        { first_name: 'Roei', last_name: 'Shriki' },
        { first_name: 'Adam', last_name: 'Ayalon' },
    ]);
}

// Define the GET / route and attach the getAbout handler to it
router.get('/', getAbout);

module.exports = router;
