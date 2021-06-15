/*
============================================
; Title:  fruit.js
; Author: Professor Krasso
; Date:   15 April 2021
; Description: Fruit Mongoose model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * fruit schema
 */
let fruitSchema = new Schema({
    type: { type: String }
});

module.exports = mongoose.model('Fruit', fruitSchema);
