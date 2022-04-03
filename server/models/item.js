/*
============================================
; Title:  item.js
; Author: Professor Krasso
; Date: 16 March 2022
; Modified By: K. Hall
; Description: Item model
;===========================================
*/

//Require mongoose
const mongoose = require('mongoose');

// Create item schema
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    text: {type: String}
});

// Export model
module.exports = itemSchema;

