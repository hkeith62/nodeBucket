/*
============================================
; Title:  create-task-dialog.component.ts
; Author: Professor Krasso
; Date: 30 March 2022
; Modified by: K Hall
; Description: TS logic for the create-task-dialog component.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css'],
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // Create a new task
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  // Reset and close dialog 
  cancel() {
    this.dialogRef.close();
  }
}
