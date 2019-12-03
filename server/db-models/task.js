/*
============================================
; Title: nodebucket
; Author: Troy Martin
; Date: 12/2/2019
; Modified By: Troy Martin
; Description: Task schema definition
;===========================================
*/

// declare the mongoose variable and import the mongoose module
const mongoose = require('mongoose');

// Declare the task Schema
var taskSchema = new mongoose.Schema({
  // declare the description, required
  description: {
    type: String,
    required: true,
  },
  // declare the date created, required and defaulted
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  // declare the priority and its possible values
  priority: {
    type: String,
    enum: ['I', 'II', 'III', 'IV', 'V'],
    required: false
  },
  // declare the background color for the task, not required
  backgroundColor: {
    type: String,
    required: false
  }
});

module.exports = taskSchema;
