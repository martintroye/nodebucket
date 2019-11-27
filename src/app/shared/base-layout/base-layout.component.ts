/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Routing module
;===========================================
*/

// imports from the angular core module
import { Component, OnInit } from '@angular/core';
// import our custom authentication service
import { AuthenticationService } from '../services/authentication.service';
// import our custom current user model
import { CurrentUser } from '../models/current-user';
// imports from the angular router modules
import { Router } from '@angular/router';

// delcare the component
@Component({
  // define the select to output the component html
  selector: 'app-base-layout',
  // define the HTML template file
  templateUrl: './base-layout.component.html',
  // define the CSS file for the component
  styleUrls: ['./base-layout.component.css']
})
// declare and export the component class
export class BaseLayoutComponent implements OnInit {
  // define the year and default to now for copyright notice
  year: number = Date.now();

  // define the observable for the logged in user
  isUserLoggedIn = false;
  // define the current user
  currentUser: CurrentUser;

  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor(private authService: AuthenticationService, private router: Router) { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit() {
    // setup the observable for the logged in behavior subject
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      // set the value on the component
      this.isUserLoggedIn = isLoggedIn;
      // if the user is logged in get the current user information
      if (this.isUserLoggedIn) {
        this.currentUser = this.authService.getCookie();
      } else {
        // if logged out clear the current user information
        this.currentUser = null;
      }
    });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Log the user out of the application
  */
  logOut() {
    // call the remove cookie method
    this.authService.removeCookie().subscribe(() => {
      // on return navigate to the login screen
      this.router.navigate(['login']);
    });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Log the user into the application
  */
  login() {
    // route to the login screen
    this.router.navigate(['login']);
  }

}
