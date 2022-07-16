// const { response } = require('express');
const { calculateObjectSize } = require('bson');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const RecipeModel = require('../models/recipes');

// controller functions must be created!

// Get all recipes
async function getRecipe(req, res) {
    try {
        const result = await mongodb.getDb().db('teamRecipePeeps').collection('recipes').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get single recipe
async function getSingleRecipe(req, res) {
    console.log('get single recipe called');
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
        result.toArray().then((lists) => {
            console.log(lists);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST create recipe
const createRecipe = async (req, res) => {
    try {
        //create new recipe
        const recipe = {
            name: req.body.name,
            email: req.body.email,
            desc: req.body.desc,
            ingredients: req.body.ingredients,
            meal: req.body.meal,
            glutenFree: req.body.glutenFree,
            cookTime: req.body.cookTime
        };

        //Save new recipe and respond
        RecipeModel.create(recipe, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });

        const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
        console.log(response);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while creating the recipe.'
            );
        }
    } catch (err) {
        res.status(500).json(err || 'Could not create recipe');
    }
};

// Update a Recipe
async function updateRecipe(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const recipe = {
            name: req.body.name,
            email: req.body.email,
            desc: req.body.desc,
            ingredients: req.body.ingredients,
            meal: req.body.meal,
            glutenFree: req.body.glutenFree,
            cookTime: req.body.cookTime
        };
        const result = await mongodb
            .getDb()
            .db()
            .collection('recipes')
            .replaceOne({ _id: id }, recipe);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Something went wrong with the update.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db()
            .collection('recipes')
            .deleteOne({ _id: id }, true);
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
module.exports = { getRecipe, getSingleRecipe, deleteRecipe, createRecipe, updateRecipe };
