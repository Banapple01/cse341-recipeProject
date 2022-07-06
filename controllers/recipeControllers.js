// const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const RecipeModel = require('../models/recipes');

// controller functions must be created!

// POST create recipe
const createRecipe = async (req, res) => {
  try {
    //create new recipe
    const recipe = {
      name: req.body.name,
      email: req.body.email,
      recipePicture: req.body.recipePicture,
      desc: req.body.desc,
      ingredients: req.body.ingredients
    };

    //Save new recipe and respond
    RecipeModel.create(recipe, (err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
  } catch (err) {
    res.status(500).json(err || 'Could not create recipe');
  }
};

// delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: id }, true);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Something went wrong while deleting the recipe.');
    }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the recipe.');
  }
};

// remember to add your function to the exports!
module.exports = { deleteRecipe, createRecipe };
