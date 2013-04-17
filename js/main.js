$(function(){

    // CACHE CALCULATION & RESULT ELEMENTS
    var calculate = $('#calculate');
    var result = $('#result');
    
    // CLICK EVENT HANDLER
    calculate.on('click', function(e){

        // Prevent Button From Posting
        e.preventDefault();

        var $form = $('form');
        if($form.valid()) {
    
            // Store Form Elements
            var weight = document.getElementById('weight').value;
            var height = document.getElementById('height').value;
            var weightUnit = $('input[name=weightUnit]:checked').val();
            var heightUnit = $('input[name=heightUnit]:checked').val();
            var age = $('#age').val() * 12;
            var gender = $('input[name=gender]:checked').val();
            var race = $('#race').val();
            var tri = $('#triglyceride');
            var hdl = $('#hdl');
            var sbp = $('#sbp');
            var glu = $('#glucose');

            // Store BMI in a variable for BMI Z-Score calculation
            var bmi = calculateBMI(weight, weightUnit, height, heightUnit);

            // Store BMI Z-Score for MetS Calculation
            var zScore = calculateZscore(age, gender, bmi);

            // Store MetS Score for Output
            var metsScore =  calculateMets(gender, race, zScore, tri, hdl, sbp, glu);

            $('#result').text(metsScore);

        }
    });

});