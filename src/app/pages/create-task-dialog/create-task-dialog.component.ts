/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/10/2019
; Modified By: Troy Martin
; Description: Create a task
;===========================================
*/
// imports from the angular core module
import { Component, OnInit } from '@angular/core';
// imports from the angular forms module
import { FormGroup, FormControl, Validators } from '@angular/forms';
// imports from the angular material module
import { MatDialogRef } from '@angular/material';
// import our custom authentication service
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
// import our custom employee service
import { EmployeeService } from 'src/app/shared/services/employee.service';
// import our current user model
import { CurrentUser } from 'src/app/shared/models/current-user.model';

// declare the component
@Component({
  // define the HTML template file
  templateUrl: './create-task-dialog.component.html',
  // define the CSS file for the component
  styleUrls: ['./create-task-dialog.component.css']
})
// declare and export the component class
export class CreateTaskDialogComponent implements OnInit {

  // declare the login form and set the default form group
  createTask = new FormGroup({
    // create the description input control, add the required validator
    description: new FormControl('', Validators.required)
  });

  // declare the current user
  currentUser: CurrentUser;

  /*
  ; Params: none
  ; Response: none
  ; Description: default constructor with injected services for the component
  */
  constructor(private authenticationService: AuthenticationService,
              private employeeService: EmployeeService,
              private dialogRef: MatDialogRef<CreateTaskDialogComponent>) { }

  /*
  ; Params: none
  ; Response: none
  ; Description: initialize the component
  */
  ngOnInit() {
    // get the logged in user information
    this.currentUser = this.authenticationService.getCookie();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: save the task
  */
  submit() {
    // if the form is valid create the task
    if (!this.createTask.invalid) {
      // call the create task method and subscribe to the result
      this.employeeService.createTask(this.currentUser.empId, this.createTask.value.description).subscribe(
        t => {
          // if saved close the dialog box with a true result
          this.dialogRef.close(true);
        },
        err => {
          // log the error to the console
          console.log(err);
        },
        () => {
          // completes the subscription
        });
    }
  }

}
