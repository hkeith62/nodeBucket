/*
============================================
; Title:  employee.interface.ts
; Author: Professor Krasso
; Date: 01 April 2022
; Modified by: K Hall
; Description: Interface for the employee task object.
;===========================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
