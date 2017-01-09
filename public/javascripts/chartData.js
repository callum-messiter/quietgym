$("#myChart").mousedown(function(e){ e.preventDefault(); });

function createChart(chartData) {
    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["6am-7am", "7am-8am", "8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "2pm-3pm", "4pm-5pm", "5pm-6pm", "6pm-7pm", "7pm-8pm", "8pm-9pm", "9pm-10pm"],
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
        success: function (dataValues) {
            console.log(dataValues);
            chartData = [{
                label: 'Monday',
                data: dataValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
            }];

            createChart(chartData);
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
