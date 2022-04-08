/*
*============================
; Title:  employee.js
; Author: Professor Krasso
; Date: 16 March 2022
; Modified by: K. Hall
; Description: Employee model.
*=============================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemDocument = require("./item");

// Define employee schema
let employeeSchema = new Schema({
    empId: {type: String, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    todo: [ItemDocument],
    done: [ItemDocument]
}, {collection: "employees"});

module.exports = mongoose.model("Employee", employeeSchema);
