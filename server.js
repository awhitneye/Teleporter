var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('teleporterDB', 'root', '123', { 
  dialect: 'mysql' 
});

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

/*  Create a '/users' route that responds to 
    a GET request with all users in the database */

app.get('/users', function(req, res) {
  User.findAll().then(function(users) {
    res.send(users);
  });
});

module.exports = { 
  app: app,
  User: User
};
