import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './shared/guards/login/login-guard';
import { AuthenticationService } from './shared/services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent
  ],
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
    MatSnackBarModule
  ],
  providers: [LoginGuard, CookieService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
