import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserLoggedIn = new BehaviorSubject(false);

  loginForm = new FormGroup({
    empId: new FormControl('', Validators.required)
  });

  constructor(private employeeService: EmployeeService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.isUserLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['']);
      }
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.employeeService.findEmployeeById('1007').subscribe((currentUser) => {
      if (currentUser) {
        this.authService.setCookie(currentUser);
      }
    });
  }

}
