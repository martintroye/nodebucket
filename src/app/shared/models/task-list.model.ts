/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/09/2019
; Modified By: Troy Martin
; Description: Task List model
;===========================================
*/
// import our custom task model
import { Task } from './task.model';

// declare and export our class
export class TaskList {
  empId: number;
  todo: Task[];
  doing: Task[];
  done: Task[];
}
