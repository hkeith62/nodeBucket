/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 10 April 2022
; Modified by: K Hall
; Description: Home component TS file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/interfaces/employee.interface';
import { Item } from '../../shared/interfaces/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './../../shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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

  // Inject the task service, cookie service, and dialog service
  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    // Call task service to findAllTasks
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log('--Server response from findAllTasks API --');
        console.log(res);

        // Set the arrays to the server response
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

  // Open the dialog to create a new todo list item
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {

      // When the user clicks the create task button
      if (data) {

        // Call to the task service to create a new task
        this.taskService.createTask(this.empId, data.text).subscribe(

          // Server response is successful
          (res) => {

            // Set the arrays to the server response
            this.employee = res;
          },

          (err) => {
            console.log('--onError of the createTask service call--');

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

    // When an tem is dropped in the todo column
    if (event.previousContainer === event.container) {

      // Move to the done list and update the task list in MongoDB
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Reordered the existing list of task items.');

      // Update the column in Mongo with the new order
      this.updateTaskList(this.empId, this.todo, this.done);

      // When an item is dropped in the done list
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Moved task item into the other container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  // Delete function
  deleteTask(taskId: string): void {

    // Confirm if the user wants to delete the task
    if (confirm('Are you sure you want to delete this task?')) {

      // Call the task service to delete the task
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(

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

  // Update function for the list
  private updateTaskList(empId: number, dodo: Item[], done: Item[]): void {

    // Call to the task service to update the list
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(

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
