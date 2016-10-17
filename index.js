var app = require('./server').app;
var User = require('./server').User;
var port = 3000;

User.sync({ force: true })
  .then(function () {
    console.log('Users table created');
    return User.create({ username: 'zlester' });
  })
  .then(function() {
    console.log('Seeded User table');
    app.listen(port, function() {
      console.log('MySql listening on ' + port);
    });
  });
  