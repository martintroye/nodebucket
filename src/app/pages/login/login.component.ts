import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {
  FormGroup,
  FormControl,
  RequiredValidator,
  Validators
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    empId: new FormControl('', Validators.required)
  });

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { }

  login() {
    if (this.loginForm.valid) {
      this.employeeService.findEmployeeById(this.loginForm.value.empId).subscribe(currentUser => {
        if (currentUser) {
          this.authService.setCookie(currentUser);
          this.router.navigate(['']);
        }
      }, (err) => {
        this.snackBar.open('Oops, that ID is not valid, please try again.', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.snackBar.open('That ID will not work, please try a valid value.', 'OK', {
        duration: 2000,
      });
    }
  }
}
