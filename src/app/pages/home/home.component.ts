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
// imports from the angular cdk module
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList
} from '@angular/cdk/drag-drop';
// imports from the angular material module
import { MatSnackBar, MatDialog } from '@angular/material';
// import our custom task model
import { Task } from 'src/app/shared/models/task.model';
// import our custom employee service
import { EmployeeService } from 'src/app/shared/services/employee.service';
// import our custom authentication service
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
// import our custom current user model
import { CurrentUser } from 'src/app/shared/models/current-user.model';
// import our custom create task dialog component
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

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
  // declare the current user
  currentUser: CurrentUser;
  // declare the todo, doing and done task arrays to bind to the lists
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor(
    private employeeService: EmployeeService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit(): void {
    // get the signed in user information
    this.currentUser = this.authenticationService.getCookie();
    // get the tasks for the signed in user
    this.findAllTasks();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: retrieve tasks for the current user
  */
  private findAllTasks() {
    this.employeeService.findAllTasks(this.currentUser.empId).subscribe(taskList => {
      // on response set the lists
      this.todo = taskList.todo;
      this.doing = taskList.doing;
      this.done = taskList.done;
    }, err => {
      // log the error to the console
      console.log(err);
      this.displayMessage('Oops, an error occurred retrieving your tasks.');
    }, () => {
      // the subscription has completed
      console.log('complete');
    });
  }

  /*
  ; Params: event: CdkDropDrop<Task[]>
  ; Response: none
  ; Description: Handles the drag and drop of an item from a list
  */
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // if moving up or down in the list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // save the new order
      this.updateTask();
    } else {
      // call the move method to change lists and save
      this.move(
        event.previousContainer,
        event.container,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /*
  ; Params: from: CdkDropList, to: CdkDropList, index, toIndex
  ; Response: none
  ; Description: move a task between arrays to the proper index location.
  */
  move(
    from: CdkDropList,
    to: CdkDropList,
    index: number,
    toIndex: number = -1
  ) {
    // call the cdk method to move the item between arrays, visual until reloaded
    transferArrayItem(
      from.data,
      to.data,
      index,
      toIndex === -1 ? to.data.length : toIndex
    );

    // call the updateTask method to persist the move to the database
    this.updateTask();
  }

  /*
  ; Params: from: Task[], index: number
  ; Response: none
  ; Description: Delete the task from the array and persist the changes
  */
  delete(from: Task[], index: number) {
    if (confirm('Are you sure you want to delete the task?')) {
      // declare the default task
      let task: Task;

      // identify the task and remove it from the array for visual
      if (index === 0) {
        task = from.shift();
      } else {
        task = from.splice(index, 1)[0];
      }

      // delete the task from the database
      this.employeeService.deleteTask(this.currentUser.empId, task._id).subscribe(
        t => {
          // on response set the returned arrays
          this.todo = t.todo;
          this.doing = t.doing;
          this.done = t.done;
        },
        err => {
          // log the err to the console
          console.log(err);
          // display a generic message to the user
          this.displayMessage('An error occurred trying to delete the task.');
        },
        () => {
          // display a confirmation message to the user
          this.displayMessage('Task deleted');
        }
      );

    }
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: open the create task dialog box
  */
  addTask() {
    // declare and create the material dialog using the customer order dialog component
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '40%',
      disableClose: true, // the user cannot click in the overlay to close
    });

    // subscribe to the after closed event
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // on close if success then refresh the tasks
        this.findAllTasks();
      }
    });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Persist changes to the task arrays, move between or index change in list
  */
  private updateTask() {
    // change the task status and update the list
    this.employeeService
      .updateTask(this.currentUser.empId, this.todo, this.doing, this.done)
      .subscribe(
        t => {
          // on response set the arrays
          this.todo = t.todo;
          this.doing = t.doing;
          this.done = t.done;
        },
        err => {
          // log the error to the console
          console.log(err);
          // display a generic error message to the user
          this.displayMessage('An error occurred trying to move the task.');
        },
        () => {
          // display a confirmation message
          this.displayMessage('Task moved');
        }
      );
  }

  /*
  ; Params: message
  ; Response: none
  ; Description: display the snackbar message
  */
  private displayMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
