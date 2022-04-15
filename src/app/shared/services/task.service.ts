/*
============================================
; Title: task.service.ts
; Author: Professor Krasso
; Date: 01 April 2022
; Modified by: K. Hall
; Description: Angular service calls to Node.js API's.
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // Calls findAllTasks API with the Node.js server

  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  // Calls create task API
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  // Updates task through the api and returns the updated list
  updateTask(empId: number, todo: Item[], doing: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
	  doing,
      done,
    });
  }

  // Calls the delete task api and returns the updated list
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
