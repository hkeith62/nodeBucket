/*
============================================
; Title:  sign-in.guard.ts
; Author: Professor Krasso
; Date: 10 April 2022
; Modified By: K Hall
; Description: Sign-in guard for Nodebucket.
;===========================================
*/

import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
// Authentication
export class SignInGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  // Check if the user is authenticated
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    //If the user is not authenticated, redirect to the sign-in page
    if (sessionUser) {
      return true; // Allow use to navigate
    } else {
      // Take to the sign-in page
      this.router.navigate(['/session/sign-in']);
      return false;
    }
  }
}

