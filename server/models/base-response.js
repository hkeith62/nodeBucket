/*
============================================
; Title:  base-response.js
; Author: Professor Krasso
; Date: 07 April 2022
; Modified By: K Hall
; Description: Base response for API request/ response.
===========================================
*/

// base response model
class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      code: this.code,
      msg: this.msg,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

module.exports = BaseResponse;
