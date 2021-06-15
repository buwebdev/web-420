/*
============================================
; Title:  password.js
; Author: Professor Krasso
; Date:   16 April 2021
; Description: Password model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let passwordSchema = new Schema({
    passId: { type: String },
    pass: { type: String }
});

module.exports = mongoose.model('Password', passwordSchema);
