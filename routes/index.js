const express = require('express');

const router = express.Router();

router.use('/', require('./swagger'));
// router.use('/recipe', require('./recipeRoutes'));

module.exports = router;
