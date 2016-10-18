var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('teleporterDB', 'root', '123', { 
  dialect: 'mysql' 
});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

/*  Create a '/users' route that responds to 
    a GET request with all users in the database */

app.get('/users', function(req, res) {
  User.findAll().then(function(users) {
    res.send(users);
  });
});

app.set('/users', function(req, res) {
  User.create().then(function(users) {
    res.send('user created');
  });
});

module.exports = { 
  app: app,
  User: User
};
