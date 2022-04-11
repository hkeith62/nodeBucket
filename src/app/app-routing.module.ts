/*
============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: App routing module for nodebucket app.
;===========================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignInGuard } from './shared/sign-in.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SignInGuard],
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent,
        canActivate: [SignInGuard],
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [SignInGuard],
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [SignInGuard],
      },
    ],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
