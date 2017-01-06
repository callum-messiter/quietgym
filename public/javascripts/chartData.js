$(document).ready(function(){

    $("#todayBtn").click(function() {
        $.ajax({
            url:"http://localhost:3000/today",
            type: "GET",
            success : function(data) {
                console.log(data);
                var todayData = data;
            },
            error : function(data) {

            }
        });
    });

    $("#weekBtn").click(function() {
        $.ajax({
            url:"http://localhost:3000/thisweek",
            type: "GET",
            success : function(data) {
                console.log(data);
            },
            error : function(data) {

            }
        });
    });

    $("#overallBtn").click(function() {
        $.ajax({
            url:"http://localhost:3000/overall",
            type: "GET",
            success : function(data) {
                console.log(data);
            },
            error : function(data) {

            }
        });
    });

    var mondayData = ['4', '14.5', '19.75', '22.75', '12', '15.5', '29', '43', '53.25', '52.5', '36', '24', '26.75', '49.75', '68.25', '60.5', '40'];
    var tuesdayData = ['20', '13', '6', '40', '30', '5', '30', '47', '50.25', '49.5', '30', '20', '24.75', '48.75', '75.25', '65.5', '41'];
    var ctx = $("#myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            },

            labels: ["6am-7am", "7am-8am", "8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "2pm-3pm", "4pm-5pm", "5pm-6pm", "6pm-7pm", "7pm-8pm", "8pm-9pm", "9pm-10pm"],

            datasets: [{
                label: 'Monday',
                data: mondayData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
            }, {
                label: 'Tuesday',
                data: tuesdayData,
                backgroundColor: 'rgba(15, 132, 147, 0.09)',
                borderColor: 'rgba(15, 132, 147, 0.89)',
                borderWidth: 2
            }]
        }
    });

});