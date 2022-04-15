/*
============================================
; Title: employee-api.js
; Author: Professor Krasso
; Date: 04 April 2022
; Modified By: K Hall
; Description: Employee API file for Nodebucket.
;===========================================
*/

const express = require("express");
const Employee = require("../models/employee");
const BaseResponse = require("../models/base-response");

const router = express.Router();

// Get employee by id
router.get("/:empId", async (req, res) => {

  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      // Error handling
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "MongoDB server error: " + err.message,
        });
      } else {

        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {

    //Catch errors and log
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

// Get all tasks for an employee by Id
router.get("/:empId/tasks", async (req, res) => {

  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo doing done",
      function (err, employee) {

        if (err) {
          console.log(err);
          res.status(501).send({
            message: "MongoDB server error: " + err.message,
          });

        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

// Create a new task
router.post("/:empId/tasks", async (req, res) => {

  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception: " + err.message,
        });

      } else {
        console.log(employee);
        const newTask = {
          text: req.body.text,
        };
        employee.todo.push(newTask);
        employee.save(function (err, updatedEmployee) {

          if (err) {
            console.log(err);
            res.status(501).send({
              message: "MongoDB Exception: " + err.message,
            });

          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

// Update a task
router.put("/:empId/tasks", async (req, res) => {

  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      if (err) {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse(
          "501",
          "Mongo sever error",
          err
        );
        res.status(501).send(updateTaskMongoErrorResponse.toObject());

      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
		  doing: req.body.doing,
          done: req.body.done,
        });

        // Save the updated employee
        employee.save(function (err, updatedEmployee) {

          if (err) {
            console.log(err);
            const updateTAskMongoOnSaveErrorResponse = new BaseResponse(
              "501",
              "Mongo sever error",
              err
            );

          } else {
            console.log(updatedEmployee);
            const updatedTaskSuccessResponse = new BaseResponse(
              "200",
              "Update successful",
              updatedEmployee
            );
            res.status(200).send(updatedTaskSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse(
      "500",
      "Internal server error",
      e
    );
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
});

// Delete a task
router.delete("/:empId/tasks/:taskId", async (req, res) => {

  // Find the employee by id
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {

      if (err) {
        console.log(err);
        const deleteTaskMongoErrorResponse = new BaseResponse(
          "501",
          "Mongo sever error",
          err
        );
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());

      } else {
        console.log(employee);

        // Check item arrays 
        const todoItem = employee.todo.find(

          (item) => item._id.toString() === req.params.taskId
        );
		
		const doingItem = employee.doing.find(
		
		  (item) => item._id.toString() === req.params.taskId
		 );
		
        const doneItem = employee.done.find(
          (item) => item._id.toString() === req.params.taskId
        );

        // If the item is in the todo array, remove it
        if (todoItem) {

          employee.todo.id(todoItem._id).remove();
          employee.save(function (err, updatedTodoItemEmployee) {

            if (err) {
              console.log(err);
              const deleteTodoItemMongoErrorResponse = new BaseResponse(
                "501",
                "Mongo sever error",
                err
              );
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());

              // Find the employee by id then update the task
            } else {

              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse(
                "200",
                "Item removed from Todo array",
                updatedTodoItemEmployee
              );
              res.status(200).send(deleteTodoItemSuccessResponse.toObject());
            }
          });

         // If the item is in the doing array, remove it
        } else if (doingItem) {

          employee.doing.id(doingItem._id).remove();
          employee.save(function (err, updatedDoingItemEmployee) {

            if (err) {
              console.log(err);
              const deleteDoingItemMongoErrorResponse = new BaseResponse(
                "501",
                "Mongo sever error",
                err
              );
              res.status(501).send(deleteDoingItemMongoErrorResponse.toObject());

            } else {
              console.log(updatedDoingItemEmployee);
              const deleteDoingItemSuccessResponse = new BaseResponse(
                "200",
                "Item removed from Doing array",
                updatedDoingItemEmployee
              );
              res.status(200).send(deleteDoingItemSuccessResponse.toObject());
            }
          });
		  
		// If the item is in the done array, remove it
        } else if (doneItem) {

          employee.done.id(doneItem._id).remove();
          employee.save(function (err, updatedDoneItemEmployee) {

            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse(
                "501",
                "Mongo sever error",
                err
              );
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());

            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse(
                "200",
                "Item removed from Done array",
                updatedDoneItemEmployee
              );
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          });

        } else {
          console.log("Invalid taskId: " + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse(
            "300",
            "Unable to locate the requested resource",
            req.params.taskId
          );
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });

  } catch (e) {
    console.log(e);
    const deleteTaskServerError = new BaseResponse(
      "500",
      "Internal server error",
      e
    );
    res.status(500).send(deleteTaskServerError.toObject());
  }
});

module.exports = router;
