/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: TS file for the home component.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from './../../shared/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;

  // Task arrays
  todo: Item[];
  done: Item[];
  empId: number;

  // Inject the employee service, cookie service, and dialog service
  constructor( private employeeService: EmployeeService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    // Use the employee service to findAllTasks
    this.employeeService.findAllTasks(this.empId).subscribe(

      (res) => {
        console.log('--Server response from findAllTasks API --');
        console.log(res);

        // Set arrays to the server response
        this.employee = res;
        console.log('-- Employee Object');
        console.log(this.employee);
      },
      // Error handling
      (err) => {
        console.log('--Server error--');
        console.log(err);
      },
      () => {

        // Set the todo and done arrays to the server response
        console.log('--onComplete of the findAllTasks service call--');
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log('--To do tasks--');
        console.log(this.todo);

        console.log('--Done tasks--');
        console.log(this.done);
      }
    );
  }
  ngOnInit(): void {}

  // Open the dialog
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    // After dialog closes, call Employee service to create a new task.
    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        this.employeeService.createTask(this.empId, data.text).subscribe(

          // If the server response is successful
          (res) => {

            this.employee = res;
          },

          // If the server response is not successful
          (err) => {
            console.log('--onError of the createTask service call--');

            // Log the error
            console.log(err);
          },

          () => {
            // Set task arrays to the server response
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {

      // Move the new item in the todo list to the done column and update the todo list in MongoDB
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Reordered the existing list of task items.');

      // Update the todo column with the new order
      this.updateTaskList(this.empId, this.todo, this.done);

      // If the item is dropped in the done column
    } else {

      // Move the todo item and update
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Moved task item into the other container');

      // Update MongoDB with the new order of the done list
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }
 // Delete function for the todo list.
 deleteTask(taskId: string): void {

  // Confirm that the user wants to delete the task.
  if (confirm('Are you sure you want to delete this task?')) {

    // Call the Employee service to delete the task
    if (taskId) {
      console.log(`Task item: ${taskId} was deleted`);

      this.employeeService.deleteTask(this.empId, taskId).subscribe(

        // If the server response is successful, set task arrays to the server response.
        (res) => {
          this.employee = res.data;
        },
        (err) => {
          console.log(err);
        },
        () => {

          // Set the todo and done arrays to the server response
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        }
      );
    }
  }
}

// Update function for the todo list
private updateTaskList(empId: number, dodo: Item[], done: Item[]): void {

  // Call the Employee service to update the task list
  this.employeeService.updateTask(this.empId, this.todo, this.done).subscribe(

    // If the server response is successful, set the task arrays to the server response
    (res) => {
      this.employee = res.data;
    },
    (err) => {
      console.log(err);
    },
    () => {

      this.todo = this.employee.todo;
      this.done = this.employee.done;
    }
  );
}
}
