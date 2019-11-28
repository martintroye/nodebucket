/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Routing module
;===========================================
*/

// imports from the angular router module
import {Routes} from '@angular/router';
// import the custom base layout component
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
// import our custom home component
import {HomeComponent} from './pages/home/home.component';
// import our custom login component
import { LoginComponent } from './pages/login/login.component';
// import our custom route guard
import { AuthGuard } from './shared/guards/auth/auth-guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

// define the routes used in the application
export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      // define the home route, requires route guard
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      // define the login route, should not have route guard
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }

];
