// Creating a recipe model for POST requests
const mongoose = require('mongoose');

// create schema and model
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    desc: {
        type: String,
        require: true
    },
    ingredients: {
        type: String,
        require: true
    },
    meal: {
        type: String,
        require: true,
        enum: ['breakfast', 'lunch', 'dinner']
    },
    glutenFree: {
        type: Boolean,
        require: true
    },
    cookTime: {
        type: String,
        require: true,
        enum: ['5', '10', '15', '20', '25', '30', '35', '40', '45']
    }
});

const RecipeModel = mongoose.model('recipe', RecipeSchema);

module.exports = RecipeModel;
