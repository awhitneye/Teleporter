var app = require('./server').app;
var User = require('./server').User;
var port = 3000;

// User.sync({ force: true })
// .then(function() {
//   console.log('Seeded User table');
//   app.listen(port, function() {
//     console.log('MySql listening on ' + port);
//   });
// });
  
//uncomment one or the other depending on if you want the table reset on re running index.js

User.sync();

app.listen(port, function() {
  console.log('MySql listening on ' + port);
});

