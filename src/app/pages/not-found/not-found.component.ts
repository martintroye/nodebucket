/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/9/2019
; Modified By: Troy Martin
; Description: 404 page for application
;===========================================
*/
// imports from the angular core module
import { Component, OnInit } from '@angular/core';

// declare the component
@Component({
  // define the HTML template file
  templateUrl: './not-found.component.html',
  // define the CSS file
  styleUrls: ['./not-found.component.css']
})
// declare and export the class
export class NotFoundComponent implements OnInit {

  /*
  ; Params: none
  ; Response: none
  ; Description: Default constructor
  */
  constructor() { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit() {
  }

}
