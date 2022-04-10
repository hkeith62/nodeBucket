/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: Sign-in component for NodeBucket App.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Validators }  from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder,
  private http: HttpClient) { }

  ngOnInit(): void {

 // Validates the password entered by regEx pattern
    this.form = this.fb.group({

      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }
 // Sign in
  onSubmit() {

     const empId = this.form.controls['empId'].value;

  // Get the empId from the form
    this.http.get('/api/employees/' + empId).subscribe((res) => {

      if (res) {
        sessionStorage.setItem(
          'name',
          `${res['firstName']} ${res['lastName']}`
        );
                 // Set the browser cookie
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']); // Navigate user to the home page after signing in.
      } else {
        this.errorMessage = 'Invalid id, Please try again';  
      }
    });
  }
}
