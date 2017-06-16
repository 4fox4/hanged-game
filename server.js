var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser= require('body-parser');
var fs = require('fs');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var db;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://houlekhi:houlekhi@ds129462.mlab.com:29462/hanged-game', function(err, database) {
  if (err) {
    throw err;
  }
  db = database;

  server.listen(3000);
  console.log('Server listen on port 3000');

  db.collection('words').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    if (result.length === 0) {
      var data = fs.readFileSync('verbe.txt');
      var wordsArray = data.toString().split("\n");
      for (var i = 0; i < 500; i++) {
        console.log('mot[' + i + ']=' + wordsArray[i]);
        db.collection('words').insertOne({index: i, word:wordsArray[i].trim()}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        });
      }
    }
  });

});

app.use(express.static('app'));

app.get('/', function (req, res) {
  res.sendfile('/index.html');
});

app.get('/word', function (req, res) {
  console.log('GET /word');
  var random = Math.floor(Math.floor(Math.random() * 500));
  console.log(random);
  db.collection('words').find({index: random}).limit(1).next(function(err, doc) {
    console.log(doc);
    assert.equal(null, err);
    assert.ok(doc != null);
    db.close();
  });
});
