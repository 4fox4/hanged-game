var express = require('express');
var app = express();
var http = require('http');
var bodyParser= require('body-parser');
var fs = require('fs');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var db;
var request = require('request');

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://houlekhi:houlekhi@ds129462.mlab.com:29462/hanged-game', function(err, database) {
  if (err) {
    throw err;
  }
  db = database;

  app.listen(3000, function() {
    console.log('listening on 3000')
  })

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
  db.collection('words').findOne({index: random}, function(err, doc) {
    var words;
    console.log(doc);
    getWordTranslation(doc.word, function(err, result) {
      if (err) return console.log('Error try GET word translation: ', err);
      console.log(result);
      words = {
        fr: doc.word,
        en: result
      };
      console.log(words);
      res.send(words);
    })
  });
});

function getWordTranslation(word, callback) {
  var options = {
    method: 'GET',
    url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    qs: {
      key: 'trnsl.1.1.20170616T124426Z.f2116bde828aaa92.3030f6d532b9d4a061db8c1ab98c732088d92105',
      text: word,
      lang: 'fr-en'
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    var resJson = JSON.parse(body);
    callback(null, resJson.text[0]);
  });
}
