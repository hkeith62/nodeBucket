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
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  // Inject the employee service, cookie service, and matdialog.
  constructor(private employeeService: EmployeeService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    // Call the employee service findAllTasks
    this.employeeService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log('--Server response from findAllTasks API --');
        console.log(res);

        // Set the todo and done arrays to the server response
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

        // Set the arrays to the server response.
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

    // Call to the employee service to create a new task after dialog closes.
    dialogRef.afterClosed().subscribe((data) => {

      // When the user clicks the create task button
      if (data) {

        // Call the employee service to create a new task
        this.employeeService.createTask(this.empId, data.text).subscribe(

          // If the server response is successful
          (res) => {

            // Set the arrays to the server response
            this.employee = res;
          },
          // If the server response is not successful
          (err) => {
            console.log('--onError of the createTask service call--');

            // Log the error
            console.log(err);
          },
          () => {

            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }

  // Drop function for the todo list
  drop(event: CdkDragDrop<any[]>) {

    // When a task is dropped in the todo column
    if (event.previousContainer === event.container) {

      // Move the task to the done column and update the list in the database
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex);
      console.log('Reordered the existing list of task items.');

      // Update the database with the new order.
      this.updateTaskList(this.empId, this.todo, this.done);

    } else {

      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.log('Moved task item into the other container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  // Delete function
  deleteTask(taskId: string): void {

    // Confirm whether the user wants to delete the task
    if (confirm('Are you sure you want to delete this task?')) {

      // Call to the employee service to delete the task
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.employeeService.deleteTask(this.empId, taskId).subscribe(

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
  }

  // Update function
  private updateTaskList(empId: number, dodo: Item[], done: Item[]): void {

    // Call to the employee service to update the task list.
    this.employeeService.updateTask(this.empId, this.todo, this.done).subscribe(

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
