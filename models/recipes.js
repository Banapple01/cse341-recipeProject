// Creating a recipe model for POST requests
const mongoose = require("mongoose");

// create schema and model
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  desc: {
    type: String,
    require: true,
  },
  ingredients: {
    type: String,
    require: true,
  },
});

const RecipeModel = mongoose.model("recipe", RecipeSchema);

module.exports = RecipeModel;
