/*
*============================
; Title:  employee.js
; Author: Richard Krasso
; Date: 16 March 2022
; Modified by: K. Hall
; Description: Employee model.
*=============================
*/
const mongoose = require("mongoose");
const Item = require('./item');

const Schema = mongoose.Schema;

// Employee Schema
let employeeSchema = new Schema({

    empId: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},

// Item arrays
    todo: [Item],
    in_progress: [Item],
    done: [Item]

}, {collection: 'employees'});

// Exporting The Model
module.exports = mongoose.model('Employee', employeeSchema); // Mongoose maps employeeSchema to Employee model.
