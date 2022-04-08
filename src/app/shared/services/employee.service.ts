/*
============================================
; Title: employee.service.ts
; Author: Professor Krasso
; Date: 01 April 2022
; Modified by: K. Hall
; Description: Angular service calls to Node.js API's.
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  //findAllTasks API calls the Node.js server.
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

   // Calls the creatTask API.
   createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  // Calls the updateTask API and updates the todo list.
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done,
    });
  }

  // Calls the delete tasks api and returns the updated list
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
