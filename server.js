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
app.use(bodyParser.urlencoded({ extended: true })); //withot this we get a really weird type eror and nothing is in the body object of the request
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //this is requiring the ejs module, can replace with some othe templating library?
///////////////////////////////////////
app.get('/', function(req, res) {
  res.render('main');
});
///////////////////////////////////////
app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  //in the ejs form, it is the name atribute that determines the key on the body of the request
  User.findOne({where: {username: req.body.username}}).then(function(user) { //make sue youre finding one
    if (bcrypt.compareSync(req.body.password, user.password)) { //if credential is eqivilent
      res.redirect('main');//
      //call create session function in? (same place as check user?) and that function also redirects to main
    } else {
      es.redirect('login');
      //freezes up when trying to redirect back to login from login?
    }
  });
});
///////////////////////////////////////
app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  //check if there is not a user with that username
  //make a new user with hashed password
  var username = req.body.username;
  User.findOne({where: {username: username}}).then(function(user) { //make sue youre finding one
    if (user) {
      res.redirect('login');
    } else {
      var hashPass = bcrypt.hashSync(req.body.password);
      User.create({username: username, password: hashPass}).then(function(users) {
        res.send('user created');
        //rather than sending anything, call create session which will redirect to main and chek for a session
      });
    }
    
  });

  
});
///////////////////////////////////////
app.get('/main', function(req, res) {
  res.render('main');
});

app.post('/main', function(req, res) {
  res.render('main');
});

module.exports = { 
  app: app,
  User: User
};
