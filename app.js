var app = require('express')();
var server = require('http').Server(app);

server.listen(3000);

app.use(express.static('app'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
