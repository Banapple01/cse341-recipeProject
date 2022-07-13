// const { response } = require('express');
const { calculateObjectSize } = require('bson');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// controller functions must be created!

// Get all recipes
async function getRecipe(req, res, next) {
    try{
        const result = await mongodb
            .getDb()
            .db('teamRecipePeeps')
            .collection('recipes')
            .find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
    } catch (err) {
        res.status(500).json(err);
    }
}
async function getSingleRecipe(req, res, next) {
    try { 
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDb
        .db('teamRecipePeeps')
        .collection('recipes')
        .find({_id: userId});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
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
module.exports = { getRecipe, getSingleRecipe, deleteRecipe };
