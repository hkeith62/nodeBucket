/*
============================================
; Title: task.service.spec.ts
; Author: Professor Krasso
; Date: 01 April 2022
; Modified by: K. Hall
; Description: Test file for the Employee task service  
;===========================================
*/

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
