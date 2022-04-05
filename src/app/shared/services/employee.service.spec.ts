/*
============================================
; Title: employee.service.spec.ts
; Author: Professor Krasso
; Date: 01 April 2022
; Modified by: K. Hall
; Description: Test file for the Employee task service  
;===========================================
*/
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
