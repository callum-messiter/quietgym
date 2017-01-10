$("#myChart").mousedown(function(e){ e.preventDefault(); });

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

            var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var keys = Object.keys(data[0]);
            var today = keys[1];
            var timeslots = [];
            var numUsers = [];

            for(var i = 0, len = data.length; i < len; i++) {
                timeslots.push(data[i].timeslot);
                numUsers.push(data[i][today]);
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
