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
import { Routes } from '@angular/router';
// import the custom base layout component
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
// import our custom home component
import { HomeComponent } from './pages/home/home.component';
// import our custom login component
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
// import our custom route guard
import { AuthGuard } from './shared/guards/auth/auth-guard';
// import the custom auth layout
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
// import our custom not found component
import { NotFoundComponent } from './pages/not-found/not-found.component';

// define the routes used in the application
export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      // define the home route route guard to secure
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      // define the route for the About page route guard to secure
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]
      }
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
      },
      // define the route to handle 404, not found
      {
        path: '404',
        component: NotFoundComponent
      },
    ]
  },
  // define the path to handle routes that do not match
  {
    path: '**',
    redirectTo: '/session/404'
  }
];
