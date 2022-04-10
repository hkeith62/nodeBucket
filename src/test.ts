/*
============================================
; Title: text.ts
; Author: Professor Krasso
; Date: 16 March 2022
; Modified By: K. Hall
; Description: This file is required by karma.conf.js and loads recursively all the .spec and framework files
;===========================================
*/

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Initializes the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const context = require.context('./', true, /\.spec\.ts$/);
// Load modules.
context.keys().map(context);
