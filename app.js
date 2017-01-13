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

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to the database.');
        throw err;
    }
    console.log('You are now connected to the database.');
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/today', function(req, res) {

    // Get name of current day as a variable, which maps to the respective column name in our db query
    function getCurrentDayName() {
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateToday = new Date();
        var n = dateToday.getDay();
        var today = weekdays[n];
        return today;
    }

    var today = getCurrentDayName();

    // Week and Year should be set dynamically, corresponding with the current week and current year respectively
    var query = "SELECT timeslot, " + today + " FROM timeslots WHERE Week = '1' AND Year = '2017'";
    connection.query(query, function(err, results) {
        if(err) {
            throw(err);
        }

        res.send(results);
    });
});

app.get('/thisweek', function(req, res) {
    var query = "SELECT timeslot, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday FROM timeslots WHERE Week = '1' AND Year = '2017' ";

    connection.query(query, function(err, results) {
        if(err) {
            console.log("Error executing query: '" + query+"'");
            throw(err);
        }

        res.send(results);
    });
});

app.get('/overall', function(req, res) {
    var query = 'SELECT timeslot,' +
                'AVG(Monday),' +
                'AVG(Tuesday),' +
                'AVG(Wednesday),' +
                'AVG(Thursday),' +
                'AVG(Friday),' +
                'AVG(Saturday),' +
                'AVG(Sunday)' +
                'FROM timeslots ' +
                'GROUP BY timeslot';

    connection.query(query, function(err, results) {
        if(err) {
            throw(err);
        }

        results.forEach(function(o) {
            Object.keys(o).forEach(function(k) {
                if(k.includes("AVG")) {
                    o[k.slice(4, -1)] = o[k]; // Extract the day of the week from the key name and create new property
                    delete o[k]; // Delete the original property
                }
            });
        });

        res.send(results);
    });
});