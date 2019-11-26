import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CurrentUser } from '../models/current-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  isUserLoggedIn = false;
  currentUser: CurrentUser;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
      if (this.isUserLoggedIn) {
        this.currentUser = this.authService.getCookie();
      } else {
        this.currentUser = null;
      }
    });
  }

  logOut() {
    this.authService.removeCookie().subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  login() {
    this.router.navigate(['login']);
  }

}
