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
            var weight = $('#weight').val();
            var height = $('#height').val();
            var weightUnit = $('input[name=weightUnit]:checked').val();
            var heightUnit = $('input[name=heightUnit]:checked').val();
            var age = $('#age').val() * 12;
            var gender = $('input[name=gender]:checked').val();
            var race = $('#race').val();
            var tri = $('#triglyceride').val();
            var hdl = $('#hdl').val();
            var sbp = $('#sbp').val();
            var glu = $('#glucose').val();

            // Store BMI in a variable for BMI Z-Score calculation
            var bmi = calculateBMI(weight, weightUnit, height, heightUnit);

            // Store BMI Z-Score for MetS Calculation
            var zScore = calculateZscore(age, gender, bmi);

            // Store MetS Score for Output
            var metsScore =  calculateMets(gender, race, zScore, tri, hdl, sbp, glu);

            result.text("MetS Score: " + metsScore);

        }
    });

});