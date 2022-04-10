/*
============================================
; Title:  sign-in.guard.spec.ts
; Author: Professor Krasso
; Date: 10 April 2022
; Modified By: K Hall
; Description: Test file for the sign-in guard.
;===========================================
*/

import { TestBed } from '@angular/core/testing';

import { SignInGuard } from './sign-in.guard';

describe('SignInGuard', () => {
  let guard: SignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
