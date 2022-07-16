const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeControllers');

// GET all recipes
router.get('/', recipeController.getRecipe);

// GET single recipe
router.get('/:id', recipeController.getSingleRecipe);

// POST create a recipe
router.post('/', recipeController.createRecipe);

// POST update a recipe
router.put('/:id', recipeController.updateRecipe);

// DELETE a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
