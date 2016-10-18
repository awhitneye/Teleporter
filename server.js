var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('teleporterDB', 'root', '123', { 
  dialect: 'mysql' 
});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //this is requiring the ejs module, can replace with some othe templating library?

app.get('/', function(req, res) {
  res.render('main');
});


app.post('/login', function(req, res) {
  //see if the credentials match
  User.findAll().then(function(users) {
    res.send(users);
  });
});

app.post('/signup', function(req, res) {
  //make a new user with hashed password
  var username = req.body.username;
  var hashPass = bcrypt.hashSync(req.body.password);
  User.create().then(function(users) {
    res.send('user created');
  });
});

module.exports = { 
  app: app,
  User: User
};
