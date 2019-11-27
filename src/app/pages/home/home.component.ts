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
  // define the selector to output the component
  selector: 'app-home',
  // define the HTML template file
  templateUrl: './home.component.html',
  // define the CSS files for the component
  styleUrls: ['./home.component.css']
})
// define and export the component
export class HomeComponent implements OnInit {

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
  ngOnInit(): void { }

}
