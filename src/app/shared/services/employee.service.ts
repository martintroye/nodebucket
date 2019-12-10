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
import { CurrentUser } from '../models/current-user.model';
// imports from the angular common http
import { HttpClient } from '@angular/common/http';
// imports from the rxjs module
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';

// declare the injectable
@Injectable({
  providedIn: 'root'
})
// declare and export the service class
export class EmployeeService {

  // declare and set the default base url for the http service calls
  baseUrl = 'http://localhost:3000/api';


  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor(private httpClient: HttpClient) { }

  /*
  ; Params: empId: string
  ; Response: Observable<CurrentUser>
  ; Description: Find the employee by id
  */
  public findEmployeeById(empId: string): Observable<CurrentUser> {
    // using the httpClient get call the api and return an Observable CurrentUser
    return this.httpClient.get<CurrentUser>(`${this.baseUrl}/employees/${empId}`);
  }

  public findAllTasks(empId: number): Observable<TaskList> {
    return this.httpClient.get<TaskList>(`${this.baseUrl}/employees/${empId}/tasks`);
  }

  public deleteTask(id: string): Observable<TaskList> {
    throw new Error('Method not implemented.');
  }

  public updateTask(): Observable<TaskList> {
    throw new Error('Method not implemented.');
  }
}
