// Load today's data as a default
getTodayData();

$("#myChart").mousedown(function(e){ e.preventDefault(); });

function getCurrentDayName() {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateToday = new Date();
    var n = dateToday.getDay();
    var today = weekdays[n];
    return today;
}

function organiseData(results) {
    var data = {};
    // Iterate the objects of the array
    results.forEach(function (o) {
        // Iterate the properties of the object
        Object.keys(o).forEach(function (k) {
            var key = k.toLowerCase();
            data[key] = data[key] || []; // Create the array if it doesn't already exist
            data[key].push(o[k]); // Push the property's value to the array sharing the property's key name
        });
    });
    return data;
}

function setDataSets(data) {
    // Generate chartData programmatically to make more readable/elegant
    dataSets = [{
        label: 'Monday',
        fill: false,
        data: data.monday,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2
    },
    {
        label: 'Tuesday',
        fill: false,
        data: data.tuesday,
        backgroundColor: 'rgba(49, 215, 49, 0.42)',
        borderColor: 'rgba(49, 215, 49, 1)',
        borderWidth: 2
    },
    {
        label: 'Wednesday',
        fill: false,
        data: data.wednesday,
        backgroundColor: 'rgba(250, 129, 30, 0.42)',
        borderColor: 'rgba(250, 129, 30, 1)',
        borderWidth: 2
    },
    {
        label: 'Thursday',
        fill: false,
        data: data.thursday,
        backgroundColor: 'rgba(81, 127, 244, 0.42)',
        borderColor: 'rgba(81, 127, 244, 1)',
        borderWidth: 2
    },
    {
        label: 'Friday',
        fill: false,
        data: data.friday,
        backgroundColor: 'rgba(172, 55, 245, 0.42)',
        borderColor: 'rgba(172, 55, 245, 1)',
        borderWidth: 2
    },
    {
        label: 'Saturday',
        fill: false,
        data: data.saturday,
        backgroundColor: 'rgba(44, 241, 221, 0.42)',
        borderColor: 'rgba(44, 241, 221, 1)',
        borderWidth: 2
    },
    {
        label: 'Sunday',
        fill: false,
        data: data.sunday,
        backgroundColor: 'rgba(238, 241, 44, 0.42)',
        borderColor: 'rgba(238, 241, 44, 1)',
        borderWidth: 2
    }];
    return dataSets;
}

function createChart(dataSets, timeslot) {
    var ctx = $("#myChart");

    window.myChart = new Chart(ctx, {
        type: 'line',
        fill: false,
        data: {
            // Set x-axis values as the array of timeslots returned as a response to the AJAX request
            labels: timeslot,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            },
            datasets: dataSets
        }
    });
}

function getTodayData() {
    $.ajax({
        url: "http://139.59.174.163:3000/today",
        type: "GET",
        success: function (data) {

            // TO-DO: Handle errors: data array empty, data[i].timeslot undefined, data[i][today] undefined
            var timeslot = [], numUsers = [];
            var today = getCurrentDayName(); // Get the name of the current day in order to reference the object's second key value

            // Loop through each object in the array (e.g. {"timeslot":"6am-7am","Tuesday":6} )
            for(var i = 0, len = data.length; i < len; i++) {
                timeslot.push(data[i].timeslot); // Push the value of the "timeslot" key (e.g. "06:00-07:00")
                numUsers.push(data[i][today]); // Push the integer value of the today key (e.g. 5)
            }

            dataSets = [{
                label: today,
                data: numUsers,
                backgroundColor: 'rgba(81, 127, 244, 0.42)',
                borderColor: 'rgba(81, 127, 244, 1)',
                borderWidth: 2
            }];

            createChart(dataSets, timeslot);
        },
        error: function (dataValues) {
            console.log("Error processing AJAX request to 'localhost/today'.")
        }
    });
}

function getThisWeekData() {
    $.ajax({
        url: "http://139.59.174.163:3000/thisweek",
        type: "GET",
        success: function (results) {
            var data = organiseData(results);
            var dataSets = setDataSets(data);
            createChart(dataSets, data.timeslot);
        },
        error: function (results) {
            console.log("Error processing AJAX request to 'localhost/thisweek'.")
        }
    });
}

function getOverallData() {
    $.ajax({
        url: "http://139.59.174.163:3000/overall",
        type: "GET",
        success: function (results) {
            var data = organiseData(results);
            var dataSets = setDataSets(data);
            createChart(dataSets, data.timeslot);
        },
        error: function (results) {
            console.log("Error processing AJAX request to 'localhost/overall'.")
        }
    });
}

$(document).ready(function() {
    // Load today's data as a default
    getTodayData();

    var home = $(".navbar-header");
    var today = $("#todayLi");
    var thisWeek = $("#thisWeekLi");
    var overall = $("#overallLi");

    home.click(function(){
        window.myChart.destroy();
        getTodayData();
    });

    today.click(function(){
        window.myChart.destroy();
        getTodayData();
    });

    thisWeek.click(function(){
        window.myChart.destroy();
        getThisWeekData();
    });

    overall.click(function() {
        window.myChart.destroy();
        getOverallData();
    });
});
