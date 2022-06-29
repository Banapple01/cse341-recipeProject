// const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// controller functions must be created!

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
module.exports = { deleteRecipe };
