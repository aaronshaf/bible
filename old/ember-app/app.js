var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

app.configure(function () {
  "use strict";

  app.set('port', process.env.PORT || 8080);

  app.use(function(req, res, next) {
    console.log(req.url);
    if(req.url === '/index.html' || req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, text) {
        res.send(text);
      });
      return;
    }
    next();
  });
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(function (req, res, next) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, text) {
      res.send(text);
    });
  });
});

var server = http.createServer(app);

server.listen(app.get('port'), function () {
  "use strict";
  console.log("Express server listening on port " + app.get('port'));
});
