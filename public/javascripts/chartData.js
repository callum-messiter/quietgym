$("#myChart").mousedown(function(e){ e.preventDefault(); });

function getCurrentDayName() {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateToday = new Date();
    var n = dateToday.getDay();
    var today = weekdays[n];
    return today;
}

function createChart(chartData, timeslots) {
    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeslots,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            },
            datasets: chartData
        }
    });
}

function getTodayData() {
    $.ajax({
        url: "http://localhost:3000/today",
        type: "GET",
        success: function (data) {

            // TO-DO: Handle errors: data array empty, data[i].timeslot undefined, data[i][today] undefined
            var timeslots = [];
            var numUsers = [];

            // Loop through each object in the array (e.g. {"timeslot":"6am-7am","Tuesday":6} )
            for(var i = 0, len = data.length; i < len; i++) {
                timeslots.push(data[i].timeslot); // Push the value of the "timeslot" key (e.g. "6am-7am")
                today = getCurrentDayName(); // Get the name of the current day in order to reference the object's second key value
                numUsers.push(data[i][today]); // Push the integer value of the today key (e.g. 5)
            }

            chartData = [{
                label: today,
                data: numUsers,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
            }];

            createChart(chartData, timeslots);
        },
        error: function (dataValues) {
            console.log("Error processing AJAX request to 'localhost/today'.")
        }
    });
}

function getThisWeekData() {
    $.ajax({
        url: "http://localhost:3000/thisweek",
        type: "GET",
        success: function (dataValues) {
            console.log(dataValues);
            chartData = [{
                label: 'Monday',
                data: dataValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
                }
            ];


            createChart(chartData);
        },
        error: function (dataValues) {
            console.log("Error processing AJAX request to 'localhost/thisweek'.")
        }
    });
}

// function getOverallData() {

// }

$(document).ready(function() {
    // Load today's data as a default
    getTodayData();

    var today = $("#todayBtn");
    var thisWeek = $("#thisWeekBtn");
    var overall = $("#overallBtn");

    today.click(function(){
        getTodayData();
    });

    thisWeek.click(function(){
        // getThisWeekData();
    });

    overall.click(function() {
        // getOverallData();
    })
});
