 /*
============================================
; Title:  sign-in.service.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: Sign-in service for nodebucket app.
;===========================================
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  empIds: Array<number>;

  constructor() {
    this.empIds = [1007, 1008, 1009, 1010, 1011, 1012];
  }

  validate(empId: number) {
    return this.empIds.some(id => id === empId);

  }
}
