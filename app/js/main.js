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
        
        //if(this.valid()) {
            var userData = $("form").serializeObject();
            zmi = new ZMI(userData);
        //}

        // Log Calculations
        console.log("BMI: " + zmi.bmi());
        console.log("BMI Z-Score: " + zmi.bmiZScore());
        console.log("BMI Percentile: " + zmi.bmiPercentile());
        console.log("MetS Z-Score: " + zmi.metsZScore());
        console.log("MetS Percentile: " + zmi.metsPercentile());
    
        return false;

        // result.show().html(
        //     '<table><tr><td>BMI<br /><span class="resultNum">' + bmiRounded + '</span></td><td>BMI Z-Score<br /><span class="resultNum">' + bmiZScoreRounded + '</span></td><td>BMI Percentile<br /><span class="resultNum"> ' + bmiPercentile + '%</span></td></tr></table>' +
        //     '<table><tr><td>MetS Z-Score<br /><span class="resultNum"> ' + metsZScoreRounded + '</span></td><td>MetS Percentile<br /><span class="resultNum">' + metsPercentile + "%</span></td></tr></table>"
        // );
    
    });

});