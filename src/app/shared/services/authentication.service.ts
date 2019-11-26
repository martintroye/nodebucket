import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { CurrentUser } from '../models/current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  cookieName = 'nodebucket.auth';

  constructor(private cookieService: CookieService) { }

  public getCookie(): CurrentUser {

    const user = this.cookieService.get(this.cookieName);

    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  public setCookie(user: CurrentUser): void {
    const cookieValue = JSON.stringify(user);
    this.cookieService.set(this.cookieName, cookieValue, 1);
  }
}
