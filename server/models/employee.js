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
const Item = require("./item");

// Define the employee schema
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [Item],
    done: [Item],
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
