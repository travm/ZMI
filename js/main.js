$(function(){

    // CACHE CALCULATION & RESULT ELEMENTS
    var calculate = $('#calculate');
    var result = $('#result');
    
    // CLICK EVENT HANDLER
    calculate.on('click', function(e){

        // Prevent Button From Posting
        e.preventDefault();

        var $form = $('form');
        //if($form.valid()) {
    
            // Store Form Elements
            var weight = $('#weight').val();
            var height = $('#height').val();
            var weightUnit = $('input[name=weightUnit]:checked').val();
            var heightUnit = $('input[name=heightUnit]:checked').val();
            var birth = moment($("#birthdate").val());
            var appointment = moment($('#appointment').val());
            var age = appointment.diff(birth, 'months'); // Should this be age? Or should it be another variable?
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
            var bmiZScore = calculateZscore(age, gender, bmi);
            var bmiZScoreRounded = Math.round(bmiZScore*100)/100;

            // Store BMI Z-Score Percentile
            var bmiPercentile = 100*(1/(1+Math.exp(-0.07056 * Math.pow(bmiZScore, 3) - (1.5976*bmiZScore))));
            var bmiPercentileRounded = Math.round(bmiPercentile*100)/100;

            // Store MetS Score for Output
            var metsZScore = calculateMets(gender, race, bmiZScore, tri, hdl, sbp, glu);
            var metsZScoreRounded = Math.round(metsZScore*100)/100;

            // Calculate MetS Z-Score Percentage
            var metsPercentile = 100*(1/(1+Math.exp(-0.07056 * Math.pow(metsZScore, 3) - (1.5976*metsZScore))));
            var metsPercentileRounded = Math.round(metsPercentile*100)/100;
            console.log("MetS Percentile: " + metsPercentile);
            console.log("MetS Percentile Rounded: " + metsPercentileRounded);


            result.show().html(
                '<table><tr><td>Your BMI<br /><span class="resultNum">' + bmiRounded + '</span></td><td>Your Z-Score<br /><span class="resultNum">' + bmiZScoreRounded + '</span></td><td>MetS Z-Score<br /><span class="resultNum"> ' + metsZScoreRounded + '</span></td></tr></table>' +
                '<table><tr><td>BMI Percentile<br /><span class="resultNum"> ' + bmiPercentileRounded + '%</span></td><td>MetS Percentile<br /><span class="resultNum">' + metsPercentileRounded + "%</span></td></tr></table>"
            );

        //}
    });

});