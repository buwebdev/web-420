/*
============================================
; Title:  fruit-routes.js
; Author: Professor Krasso
; Date:   15 April 2021
; Description: Fruit API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruit');

/**
 * findAllFruits
 * @openapi
 * /api/fruits:
 *   get:
 *     tags:
 *       - Fruits
 *     description: API for returning an array of fruit objects.
 *     summary: returns an array of fruits in JSON format.
 *     responses:
 *       '200':
 *         description: array of fruits.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/fruits', async(req, res) => {
    try {
        Fruit.find({}, function(err, fruits) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(fruits);
                res.json(fruits);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findFruitById
 * @openapi
 * /api/fruits/{id}:
 *   get:
 *     tags:
 *       - Fruits
 *     description:  API for returning a fruit document
 *     summary: returns a fruit document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Fruit document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Fruit document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/fruits/:id', async(req, res) => {
    try {
        Fruit.findOne({'_id': req.params.id}, function(err, fruit) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(fruit);
                res.json(fruit);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createFruit
 * @openapi
 * /api/fruits:
 *   post:
 *     tags:
 *       - Fruits
 *     name: createFruit
 *     description: API for adding a new fruit document to MongoDB Atlas
 *     summary: Creates a new fruit document
 *     requestBody:
 *       description: Fruit information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Fruit added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/fruits', async(req, res) => {
    try {
        const newFruit = {
            type: req.body.type
        }

        await Fruit.create(newFruit, function(err, fruit) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(fruit);
                res.json(fruit);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * updateFruit
 * @openapi
 * /api/fruits/{id}:
 *   put:
 *     tags:
 *       - Fruits
 *     name: updateFruit
 *     description: API for updating an existing document in MongoDB.
 *     summary: Updates a document in MongoDB. 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id to filter the collection by. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Fruit information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Fruit added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/fruits/:id', async (req, res) => {
    try {
        const fruitDocId = req.params.id; 

        Fruit.findOne({'_id': fruitDocId}, function(err, fruit) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(fruit);

                fruit.set({
                    type: req.body.type
                });

                fruit.save(function(err, updatedFruit) {
                    if (err) {
                        console.log(err);
                        res.json(updatedFruit);
                    } else {
                        console.log(updatedFruit);
                        res.json(updatedFruit);
                    }
                })
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * deleteFruit
 * @openapi
 * /api/fruits/{id}:
 *   delete:
 *     tags:
 *       - Fruits
 *     name: deleteFruit
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Fruit added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/fruits/:id', async (req, res) => {
    try {
        const fruitDocId = req.params.id;

        Fruit.findByIdAndDelete({'_id': fruitDocId}, function(err, fruit) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(fruit);
                res.json(fruit);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
