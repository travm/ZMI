$(function(){

    // CACHE CALCULATION BUTTON
    var calculate = $('#calculate');

    // CACHE RESULT DIV
    var result = $('#result');


    // PULL & PROCESS DATA FILE
    var test = "Oh no! Population data wasn't loaded properly.";

    $.ajax({
        type: "GET",
        url: "data/data.txt",
        dataType: "text",
        async:false,
        success: function(data) { test = processCSV(data); }
    });

    for(var i = 0; i < test.length; i++) {
        console.log(test[i]);
    }

    console.log(test);

    
    // CLICK EVENT HANDLER
    calculate.on('click', function(e){

        e.preventDefault();

        var bmi = calculateBMI();

        $('#result').text(bmi);

    });

});