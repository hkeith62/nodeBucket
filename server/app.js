/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date: 16 March 2022
; Modified By: K. Hall
; Description: Api file for Nodebucket
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require("./models/employee");
const itemSchema = require('./models/item');

/* App configurations */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/* Variables */
 const port = process.env.PORT || 3000; // server port

/* TODO: This line will need to be replaced with your actual database connection string */
 const conn = 'mongodb+srv://web420_user:hkh0fENnVd7P7TTB@cluster0.hn2i8.mongodb.net/nodebucket';

/* Database connection */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
});

/* API(s) go here */

 // FindEmployeeById
app.get("/api/employees/:empId", async (req, res) => {

  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      if (err) {
        res.status(401).send({
          message: `Error occurred. Please check ID`, //sends error message with invalid id
        });

        res.status(501).send({
          message: `MongoDB Exception`, //sends error message with invalid id
        });

      // Log and Returns an employee model in Json
      } else {
        console.log(employee);
        res.json(employee);
      }
    });

  } catch (e) {
    res.status(404).send({
      message: `Employee ID Not Found`,
    });
    res.status(500).send({
      message: `Internal Server Error`,
    });
  }
});

// FindAllTasks- FindEmployeeById
app.get("/api/employees/:empId/tasks", async (req, res) => {

  try {
    Employee.findOne({ empId: req.params.empId }, 'empId todo done', function (err, employee) {

      if (err) {
        res.status(401).send({
          message: `Error occurred. Please check ID`, //sends error message with invalid id
        });

        res.status(501).send({
          message: `MongoDB Exception`, //sends error message with invalid id
        });

      // Log and Returns an employee model in Json
      } else {
        console.log(employee);
        res.json(employee);
      }
    });

    //CreateTasks
 app.post('/api/employees/:empId/tasks', async(req, res) =>{

  try{
    //find user by Id
    Employee.findOne({'empId':req.params.empId}, function(err,employee){
      //error response
      if(err){
        res.status(401).send({
          message: `Error occurred. Please check ID`, //sends error message with invalid id
        });

        res.status(501).send({
          message: `MongoDB Exception`, //sends error message with invalid id
        });

        //create new item
      }else{
        console.log(employee);
        const item = {
          text: req.body.text
        };
        //push item to do list
        employee.todo.push(item);
        //save item to database
        employee.save(function(err,updatedEmployee){

          if(err){
            console.log(err);
            res.status(500).send({
              message: `Internal Server Error`,
            });

          }else{
            console.log(updatedEmployee);
            res.status(200).send({
            message: `Your Task Has Been Added ${updatedEmployee}`
            });
            res.json(updatedEmployee);
          }
      })
    }
  })
  } catch (e){
    console.log(e);
    res.status(404).send({
      message: `Employee ID Not Found`,
    });
    res.status(500).send({
      message: `Internal Server Error`,
    });
  }
});

  } catch (e) {
    res.status(404).send({
      message: `Employee ID Not Found`,
    });
    res.status(500).send({
      message: `Internal Server Error`,
    });
  }
});



/* Create and start server */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
