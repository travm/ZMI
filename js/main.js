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
            var age = $('#age').val();
            var gender = $('input[name=gender]:checked').val();
            var race = $('#race').val();
            var tri = $('#triglyceride').val();
            var hdl = $('#hdl').val();
            var sbp = $('#sbp').val();
            var glu = $('#glucose').val();

            // Store BMI in a variable for BMI Z-Score calculation
            var bmi = calculateBMI(weight, weightUnit, height, heightUnit);
            var bmiRounded = Math.round(bmi*100)/100;

            // Store BMI Z-Score for MetS Calculation
            var zScore = calculateZscore(age, gender, bmi);
            var zScoreRounded = Math.round(zScore*100)/100;

            // Store MetS Score for Output
            var metsScore = calculateMets(gender, race, zScore, tri, hdl, sbp, glu);
            var metsScoreRounded = Math.round(metsScore*100)/100;

            // Calculate MetS Z-Score Percentage
            var metsPercentile = ((1/(Math.sqrt(2*3.14)))*(Math.pow(2.718281828, -(Math.pow(zScore, 2)/2)))*2)*100;
            var metsPercentileRounded = Math.round(metsPercentile*100)/100;

            result.show().html(
                '<table>' + 
                '<tr><td>Your BMI<br /><span class="resultNum">' + bmiRounded + '</span></td><td>Your Z-Score<br /><span class="resultNum">' + zScoreRounded + "</span></td></tr>" +
                '<tr><td>MetS Score<br /><span class="resultNum"> ' + metsScoreRounded + '</span></td><td>MetS Percent<br /><span class="resultNum">' + metsPercentileRounded + "%</span></td></tr>" +
                '</table>'
            );

        }
    });

});