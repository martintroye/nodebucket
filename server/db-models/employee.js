/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Employee model and schema definition
;===========================================
*/
// declare the mongoose variable and import the mongoose module
const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var employeeSchema = new mongoose.Schema({
  // declare the employee id property and set the options
  empId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true
  },
  // declare the first name property and set the options
  firstName: {
    type: String,
  },
  // declare the last name property and set the options
  lastName: {
    type: String,
  }
});

//Export the Employee model using the employee schema
module.exports = mongoose.model('Employee', employeeSchema);
