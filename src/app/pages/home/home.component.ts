/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Routing module
;===========================================
*/
// imports from the angular core module
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';


// declare the component
@Component({
  // define the selector to output the component
  selector: 'app-home',
  // define the HTML template file
  templateUrl: './home.component.html',
  // define the CSS files for the component
  styleUrls: ['./home.component.css']
})
// define and export the component
export class HomeComponent implements OnInit {

  currentUser: CurrentUser;
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor(private employeeService: EmployeeService,
              private authenticationService: AuthenticationService) { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCookie();
    this.employeeService.findAllTasks(this.currentUser.empId).subscribe((taskList) => {
      this.todo = taskList.todo;
      this.doing = taskList.doing;
      this.done = taskList.done;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.move(event.previousContainer, event.container, event.previousIndex, event.currentIndex);
    }
  }

  move(from: CdkDropList, to: CdkDropList, index: number, toIndex: number = -1) {
    // change the task status and update the list
    this.employeeService.updateTask().subscribe((t) => {
      from.data[index] = t;
      transferArrayItem(from.data,
        to.data,
        index,
        toIndex === -1 ? to.data.length : toIndex);
    });
  }

  delete(from: Task[], index: number) {
    let task: Task;

    if (index === 0) {
      task = from.shift();
    } else {
      task = from.splice(index, 1)[0];
    }

    this.employeeService.deleteTask(task._id).subscribe((status) => {
      if (status) {
        // display banner
        console.log('deleted');
      }
    });
  }

}
