$(function(){

    // Cache Calculation Button
    var calculate = $('#calculate');

    // Cache Result Div/Area
    var result = $('#result');


    // PULL & PROCESS DATA FILE
    $.ajax({
        type: "GET",
        url: "data/data.txt",
        dataType: "text",
        success: function(data) {processData(data)}
    });

    //console.log(t);

    calculate.on('click', function(){

        var bmi = calculateBMI();

        $('#result').text(bmi);

    });

});