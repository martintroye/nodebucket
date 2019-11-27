/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: login form component
;===========================================
*/

// imports from the angular core module
import { Component, OnInit } from '@angular/core';
// import our custom employee service
import { EmployeeService } from 'src/app/shared/services/employee.service';
// import our custom authentication service
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
// imports from the angular forms module
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
// imports from the angular router module
import { Router } from '@angular/router';
// imports from the angular material module
import { MatSnackBar } from '@angular/material';

// declare the component
@Component({
  // define the HTML template file
  templateUrl: './login.component.html',
  // define the CSS file for the component
  styleUrls: ['./login.component.css']
})
// declare and export the component class
export class LoginComponent implements OnInit {

  // declare the login form and set the default form group
  loginForm = new FormGroup({
    // create the empId input control, add the required validator
    empId: new FormControl('', Validators.required)
  });

  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit() { }

  /*
  ; Params: none
  ; Response: none
  ; Description: log the user based on input from the form
  */
  login() {
    // define the default error message
    const defaultMessage = 'Oops, that ID is not valid, please try again.';
    // if the form is valid log the user in
    if (this.loginForm.valid) {
      this.employeeService.findEmployeeById(this.loginForm.value.empId).subscribe(currentUser => {
        // if the employee is found create the cookie and send to the root of the site
        if (currentUser) {
          this.authService.setCookie(currentUser);
          this.router.navigate(['']);
        } else {
          // display a message to the user
          this.displayMessage(defaultMessage);
        }
      }, (err) => {
        // there was an error validating the user
        this.displayMessage(defaultMessage);
      });
    } else {
      // if the login form is not valid give the user extra feedback
      this.displayMessage('That ID will not work, please try a valid value.');
    }
  }

  /*
  ; Params: message
  ; Response: none
  ; Description: display the snackbar message
  */
  private displayMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
