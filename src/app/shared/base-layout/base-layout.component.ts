import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from 'src/app/pages/home/home.component';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  username: string;
  badgeCount: number;
  userRole: any;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    console.log('isLoggedIn: ' + this.isLoggedIn);
    this.badgeCount = 0;
   }

  ngOnInit(): void {
    this.username = this.cookieService.get('session_user');
  }

  isAdmin(): boolean {
    return this.userRole.role === 'admin';
  }

  userConfig(): void {
    this.router.navigate(['/users']);
  }

  questionConfig(): void {
    this.router.navigate(['/security-questions']);
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in']);
  }

  roleConfig(): void{
    this.router.navigate(['/roles']);
  }

  adminReport(): void {
    this.router.navigate(['/purchases-by-service-graph'])
  }

}
