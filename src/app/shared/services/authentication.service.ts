/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Service to control authentication operations
;===========================================
*/

// imports from the angular core module
import { Injectable } from '@angular/core';
// imports from the ngx-cookie-service module
import { CookieService } from 'ngx-cookie-service';
// imports from the rxjs module
import { BehaviorSubject, Observable, of } from 'rxjs';
// import our custom CurrentUser model
import { CurrentUser } from '../models/current-user';

// declare the injectable
@Injectable({
  providedIn: 'root'
})
// declare and export the service class
export class AuthenticationService {
  // declare the cookie name and set the default value
  cookieName = 'nodebucket.auth';
  // declare the logged in property as a behavior subject for others to subscribe to
  isLoggedIn = new BehaviorSubject(false);

  /*
  ; Params: cookieService: CookieService
  ; Response: none
  ; Description: Default constructor
  */
  constructor(private cookieService: CookieService) {
    if (this.getCookie()) {
      this.isLoggedIn.next(true);
    }
   }

  /*
  ; Params: none
  ; Response: CurrentUser or null
  ; Description: retrieve the authentication cookie and return the current user
  ; returns null if cookie does not exist
  */
  public getCookie(): CurrentUser {
    // using the cookie service retrieve the cookie by name
    const user = this.cookieService.get(this.cookieName);

    // if the cookie does not exist return null
    if (!user) {
      return null;
    } else {
      // return the cookie value as the CurrentUser object by parsing the json
      return JSON.parse(user);
    }
  }

  /*
  ; Params: user: CurrentUser
  ; Response: none
  ; Description: create the authentication cookie and log in
  */
  public setCookie(user: CurrentUser): void {
    // if the user argument is not null create the cookie
    if (user) {
      // turn the user object into a string
      const cookieValue = JSON.stringify(user);
      // create the cookie using the specified name, string value for a day
      this.cookieService.set(this.cookieName, cookieValue, 1);
      // push the value onto the behavior subject to note the user is logged in
      this.isLoggedIn.next(true);
    }
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: delete the cookie and log out
  */
  public removeCookie(): Observable<boolean> {
    // delete the cookie by name
    this.cookieService.delete(this.cookieName);
    // push the value onto the behavior subject to note the user is logged out
    this.isLoggedIn.next(false);
    // making the method observable so that consumers can know the cookie was deleted
    return of(true);
  }
}
