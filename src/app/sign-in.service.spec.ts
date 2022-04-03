 /*
============================================
; Title:  sign-in.service.spec.ts
; Author: Professor Krasso
; Date: 25 March 2022
; Modified By: K. Hall
; Description: Sign-in service test file for nodebucket app.
;===========================================
*/
import { TestBed } from '@angular/core/testing';

import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
