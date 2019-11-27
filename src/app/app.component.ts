/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Application module
;===========================================
*/
// imports from the angular core module
import { Component } from '@angular/core';

// declare the component
@Component({
  // define the selector to output the component
  selector: 'app-root',
  // define the inline template for the HTML
  template: `<router-outlet></router-outlet>`,
  // define the inline styles for the component
  styles: [``]
})
// declare and export the component
export class AppComponent {
  // declare and set the title of the component
  title = 'nodebucket';
}
