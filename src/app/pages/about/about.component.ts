/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/7/2019
; Modified By: Troy Martin
; Description: About page for application
;===========================================
*/
// imports from the angular core module
import { Component, OnInit } from '@angular/core';

// declare the component
@Component({
  // define the HTML template for the component
  templateUrl: './about.component.html',
  // define the CSS file for the component
  styleUrls: ['./about.component.css']
})
// declare and export the component class
export class AboutComponent implements OnInit {

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
