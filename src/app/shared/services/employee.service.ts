/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Service interact with employees api
;===========================================
*/

// imports from the angular core module
import { Injectable } from '@angular/core';
// import our custom CurrentUser model
import { CurrentUser } from '../models/current-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  public findEmployeeById(empId: string): Observable<CurrentUser> {
    return this.httpClient.get<CurrentUser>(`${this.baseUrl}/employees/${empId}`);
  }
}
