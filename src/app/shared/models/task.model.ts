/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/9/2019
; Modified By: Troy Martin
; Description: Task model
;===========================================
*/
// declare and export the task class
export class Task {
  // tslint:disable-next-line: variable-name
  _id: string;
  description: string;
  priority: string;
  backgroundColor: string;
  dateCreated: Date;
}
