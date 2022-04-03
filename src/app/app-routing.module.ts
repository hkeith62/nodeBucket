/*
============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: App routing module for NodeBucket App.
;===========================================
*/

import { SignInGuard} from './shared/sign-in.guard';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
	  {
		path: 'home',
		component: HomeComponent
	  },
      {
        path: 'how-it-works',
        component: HowItWorksComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      // Login route
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ]
  },
  // Handles routes that do not match
  {
    path: '**',
    redirectTo: '/session/not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
