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
import { SignInService } from '../../sign-in.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;


  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private signinService: SignInService) { }

  ngOnInit(): void {

    this.form = this.fb.group({

      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  onSubmit() {
    const formValues = this.form.value;
    const empId = parseInt(formValues.empId);

    if (this.signinService.validate(empId)) {
      this.cookieService.set('session_user', empId.toString(), 1)
      this.router.navigate(['/']) // When user signs in they are routed to the invoicing page.
    } else {
      this.errorMessage = `The employee ID you entered is invalid, please try again.`;
    }
  }
}
