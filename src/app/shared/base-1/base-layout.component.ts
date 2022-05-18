/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: Base layout component for NodeBucket App.
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean; // Checks if a user is logged in.
  userName: string;

  // Inject router and cookie service to this component
  constructor(private cookieService: CookieService, private router: Router) {

    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    this.userName = sessionStorage.getItem('userName');
    console.log('Signed in as: ' + this.userName);
  }

  ngOnInit(): void {}

  // Sign out and navigate back to sign-in page.
  signOut() {

    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in']);
  }
}
