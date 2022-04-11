/*
============================================
; Title:  item.js
; Author: Professor Krasso
; Date: 16 March 2022
; Modified By: K. Hall
; Description: Item model
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the item schema
let itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;
