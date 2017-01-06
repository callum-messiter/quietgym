var express = require('express');
var path = require('path');
var mysql = require('mysql');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

// Initiate database connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'quietgym'
});

app.get('/', function(req, res) {
  // Returns an array containing the number of average users per hour for every hour of the current day
  var query = 'SELECT AVG(numUsers) FROM attendance WHERE date = "2017-01-04" GROUP BY HOUR(time)';
  connection.query(query, function(err, results) {
    if(err) {
      console.log(err);
    }

    var values = [];
    for(var i = 0; i < results.length; i++) {
      values[i] = results[i]['AVG(numUsers)'];
      // console.log(values[i]);
    }
    console.log(values);
    res.render('index', { values: values });
  });
});

app.get('/today', function(req, res) {
    // Returns an array containing the number of average users per hour for every hour of the current day
    var query = 'SELECT AVG(numUsers) FROM attendance WHERE date = "2017-01-04" GROUP BY HOUR(time)';
    connection.query(query, function(err, results) {
        if(err) {
            console.log(err);
        }

        var values = [];
        for(var i = 0; i < results.length; i++) {
            values[i] = results[i]['AVG(numUsers)'];
            // console.log(values[i]);
        }
        // console.log(values);
        res.send(values);
    });
});

app.get('/thisweek', function(req, res) {
    res.send("Request for this week's data successful!");
});

app.get("/overall", function(req, res) {
    res.send("Request for overall data successful!");
});