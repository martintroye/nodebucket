/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Guarding Routes
;===========================================
*/
// start program

// import the angular core module
import { Injectable } from '@angular/core';
// import the angular router module
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

// declare the injectable
@Injectable()
// declare and export the class, implementing the CanActivate route guard interface
export class LoginGuard implements CanActivate {
  // define the constructor and inject a router
  constructor(private router: Router, private authService: AuthenticationService) {}

  /*
  ; Params: none
  ; Response: boolean
  ; Description: If the user is logged in return true otherwise route to login page
  */
  canActivate() {
    const user = this.authService.getCookie();

    if (user === null) {
      this.router.navigate(['login']);
    }

    // return the logged in status
    return true;
  }
}

// end program
