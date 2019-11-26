/*
============================================
; Title: nodebucket
; Author: Richard Krasso
; Date: 11/25/2019
; Modified By: Troy Martin
; Description: Nodejs application for nodebucket application
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const employeeModel = require('./db-models/employee');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// connection string to the mongo db
const conn = 'mongodb+srv://admin:admin@buwebdev-cluster-1-opi0o.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s)
 */

/*
; Params: empId, callback function
; Response: matching employee
; Description: FindEmployeeById - find an employee by the employee id
*/
app.get('/api/employees/:empId', (request, response) => {
  // Declare the employee id and get the value off the url if it exists
  var employeeId = request.params && request.params.empId ? request.params.empId : null;

  // if the employeeId was not defined then return a bad request response
  if (!employeeId) {
    // set the status code to 400, bad request and send a message
    response.status(400).send('Request has invalid or missing employee id.');
  }

  // Using the findOne method of the employee model search for a matching employee id
  employeeModel.findOne({ empId: employeeId }, (err, res) => {
    // if there is an error return a 500, server error and the error
    if (err) {
      response.status(500).send(err);
    } else {
      // if a matching employee is not found res will be null
      if (!res) {
        // set the status code to 403, forbidden and return a message
        response.status(403).send('Invalid employee.');
      } else {
        // set the status code to 200, OK and return the response as json
        response.status(200).send(res.toJSON());
      }
    }
  });

})

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
