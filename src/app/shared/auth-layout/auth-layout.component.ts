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

// declare the component
@Component({
  // define the selector to output the component HTML
  selector: 'app-auth-layout',
  // define the HTML template file
  templateUrl: './auth-layout.component.html',
  // define the CSS files for the component
  styleUrls: ['./auth-layout.component.css']
})
// declare and export the component class
export class AuthLayoutComponent implements OnInit {

  /*
  ; Response: none
  ; Description: Default constructor, with injections needed in component
  */
  constructor() { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit(): void {  }
}
