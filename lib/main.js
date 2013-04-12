$(function(){

    // CACHE CALCULATION BUTTON
    var calculate = $('#calculate');

    // CACHE RESULT DIV
    var result = $('#result');
    
    // CLICK EVENT HANDLER
    calculate.on('click', function(e){

        // Prevent Button From Posting
        e.preventDefault();

        // Store Form Elements
        var weight = document.getElementById('weight').value;
        var height = document.getElementById('height').value;
        var weightUnit = $('input[name=weightUnit]:checked').val();
        var heightUnit = $('input[name=heightUnit]:checked').val();
        var age = $('#age').value / 12;
        var gender = $('input[name=gender]:checked').val();

        var bmi = calculateBMI(weight, weightUnit, height, heightUnit);

        //var zscore = calculateZscore(age, gender, bmi);

        $('#result').text(bmi);

    });

});