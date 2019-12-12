import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  // declare the login form and set the default form group
  createTask = new FormGroup({
    // create the description input control, add the required validator
    description: new FormControl('', Validators.required)
  });

  currentUser: CurrentUser;
  createTask$: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private employeeService: EmployeeService,
              private dialogRef: MatDialogRef<CreateTaskDialogComponent>) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCookie();
  }

  submit() {
    if (!this.createTask.invalid) {
      this.createTask$ = this.employeeService.createTask(this.currentUser.empId, this.createTask.value.description).subscribe(
        t => {
          this.dialogRef.close(true);
        },
        err => {
          // log the error to the console
          console.log(err);
        },
        () => {
        });
    }
  }

}
