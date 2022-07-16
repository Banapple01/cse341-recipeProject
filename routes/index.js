const express = require('express');

const router = express.Router();

router.use('/', require('./swagger'));

// un-comment the line below when the controllers have been made for the routes in recipeRoutes.js
router.use('/recipe', require('./recipeRoutes'));

module.exports = router;
