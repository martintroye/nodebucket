/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Application module
;===========================================
*/

// imports from the angular platform browser module
import { BrowserModule } from '@angular/platform-browser';
// imports from the angular core module
import { NgModule } from '@angular/core';
// imports from the angular router module
import { RouterModule} from '@angular/router';
// import our custom routes
import { AppRoutes } from './app.routing';
// imports from the angular common http module
import { HttpClientModule, HttpClient } from '@angular/common/http';
// imports from the angular forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import our custom app component
import { AppComponent } from './app.component';
// imports from the angular platform browser animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import our custom base layout component
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
// import our custom auth layout component
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
// import our custom home component
import { HomeComponent } from './pages/home/home.component';
// import the angular flex layout module
import {FlexLayoutModule} from '@angular/flex-layout';
// import the angular material modules
import {MatToolbarModule} from '@angular/material/toolbar';
// import the angular material modules
import {MatButtonModule} from '@angular/material/button';
// import the angular material modules
import {MatIconModule} from '@angular/material/icon';
// import the angular material modules
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialog, MatDialogModule} from '@angular/material';
// import the ngx-cookie-service module
import { CookieService } from 'ngx-cookie-service';
// import our custom login component
import { LoginComponent } from './pages/login/login.component';
// import our custom login route guard
import { AuthGuard } from './shared/guards/auth/auth-guard';
// import our custom authentication service
import { AuthenticationService } from './shared/services/authentication.service';
// import out custom about component
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EmployeeService } from './shared/services/employee.service';
import { CreateTaskDialogComponent } from './pages/create-task-dialog/create-task-dialog.component';



// declare the module
@NgModule({
  // components defined in this module
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    NotFoundComponent,
    CreateTaskDialogComponent
  ],
  // modules to import into this module
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    DragDropModule,
    MatDialogModule,

  ],
  // define the injectables for the module
  providers: [AuthGuard, CookieService, AuthenticationService, EmployeeService, MatDialog],
  entryComponents: [CreateTaskDialogComponent],
  // define the component to bootstrap the application
  bootstrap: [AppComponent]
})
// declare and export the module class
export class AppModule { }
