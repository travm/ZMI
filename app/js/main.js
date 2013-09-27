$(function(){
    "use strict";

    // Show/Hide Adult/Child Inputs
    if ($("#type").val() == "adult") {
        $(".child").hide();
        $(".adult").show();
    } else {
        $(".adult").hide();
        $(".child").show();
    }

    // Initialize Variables
    var zmi;

    // Form Submission    
    $("form").submit(function(e) {

        // Prevent Post
        e.preventDefault();
        
        // Validate Input
        var input = $(this).validate(); 
        
        if(input.valid()) {

            var userData = $("form").serializeObject();
            zmi = new ZMI(userData);

            var bmi = Math.round(zmi.bmi()*100)/100;
            var bmiZScore = Math.round(zmi.bmiZScore()*100)/100;
            var bmiPercentile = Math.round(zmi.bmiPercentile()*10)/10;
            var metsZScore = Math.round(zmi.metsZScore()*100)/100;
            var metsPercentile = Math.round(zmi.metsPercentile()*10)/10;


        } else {
            
            return false;

        }


        // Display Data On Page
        $('#result').show().html(
            '<table><tr><td>BMI<br /><span class="resultNum">' + bmi + '</span></td><td>BMI Z-Score<br /><span class="resultNum">' + bmiZScore + '</span></td><td>BMI Percentile<br /><span class="resultNum"> ' + bmiPercentile + '%</span></td></tr></table>' +
            '<table><tr><td>MetS Z-Score<br /><span class="resultNum"> ' + metsZScore + '</span></td><td>MetS Percentile<br /><span class="resultNum">' + metsPercentile + "%</span></td></tr></table>"
        );

        // Log Calculations
        // console.log("BMI: " + zmi.bmi());
        // console.log("BMI Z-Score: " + zmi.bmiZScore());
        // console.log("BMI Percentile: " + zmi.bmiPercentile());
        // console.log("MetS Z-Score: " + zmi.metsZScore());
        // console.log("MetS Percentile: " + zmi.metsPercentile());
    
    });

});