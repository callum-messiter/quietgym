$("#myChart").mousedown(function(e){ e.preventDefault(); });

function getCurrentDayName() {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateToday = new Date();
    var n = dateToday.getDay();
    var today = weekdays[n];
    return today;
}

function createChart(chartData, timeslot) {
    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        fill: false,
        data: {
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
            var timeslot = [], numUsers = [];
            var today = getCurrentDayName(); // Get the name of the current day in order to reference the object's second key value

            // Loop through each object in the array (e.g. {"timeslot":"6am-7am","Tuesday":6} )
            for(var i = 0, len = data.length; i < len; i++) {
                timeslot.push(data[i].timeslot); // Push the value of the "timeslot" key (e.g. "6am-7am")
                numUsers.push(data[i][today]); // Push the integer value of the today key (e.g. 5)
            }

            chartData = [{
                label: today,
                data: numUsers,
                backgroundColor: 'rgba(81, 127, 244, 0.42)',
                borderColor: 'rgba(81, 127, 244, 1)',
                borderWidth: 2
            }];

            createChart(chartData, timeslot);
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
        success: function (data) {

                var timeslot = [];
                var Monday = [];
                var Tuesday = [];
                var Wednesday = [];
                var Thursday = [];
                var Friday = [];
                var Saturday = [];
                var Sunday = [];

                data.map(function (each) {
                    timeslot.push(each.timeslot);
                    Monday.push(each.Monday);
                    Tuesday.push(each.Tuesday);
                    Wednesday.push(each.Wednesday);
                    Thursday.push(each.Thursday);
                    Friday.push(each.Friday);
                    Saturday.push(each.Saturday);
                    Sunday.push(each.Sunday);
                });

                console.log(timeslot, Monday, Tuesday);

                // Generate chartData programmatically to make more readable/elegant
                chartData = [{
                    label: 'Monday',
                    fill: false,
                    data: Monday,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2
                },
                {
                    label: 'Tuesday',
                    fill: false,
                    data: Tuesday,
                    backgroundColor: 'rgba(49, 215, 49, 0.42)',
                    borderColor: 'rgba(49, 215, 49, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Wednesday',
                    fill: false,
                    data: Wednesday,
                    backgroundColor: 'rgba(250, 129, 30, 0.42)',
                    borderColor: 'rgba(250, 129, 30, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Thursday',
                    fill: false,
                    data: Thursday,
                    backgroundColor: 'rgba(81, 127, 244, 0.42)',
                    borderColor: 'rgba(81, 127, 244, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Friday',
                    fill: false,
                    data: Friday,
                    backgroundColor: 'rgba(172, 55, 245, 0.42)',
                    borderColor: 'rgba(172, 55, 245, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Saturday',
                    fill: false,
                    data: Saturday,
                    backgroundColor: 'rgba(44, 241, 221, 0.42)',
                    borderColor: 'rgba(44, 241, 221, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Sunday',
                    fill: false,
                    data: Sunday,
                    backgroundColor: 'rgba(238, 241, 44, 0.42)',
                    borderColor: 'rgba(238, 241, 44, 1)',
                    borderWidth: 2
                }];

            createChart(chartData, timeslot);
        },
        error: function (data) {
            console.log("Error processing AJAX request to 'localhost/thisweek'.")
        }
    });
}

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
        getThisWeekData();
    });

    overall.click(function() {
        // getOverallData();
    })
});
