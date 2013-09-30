$(function(){
    "use strict";

    // Show/Hide Adult/Child Inputs
    // if ($("#type").val() == "adult") {
     
    //     $(".child").hide();
    //     $(".adult").show();
    
    // } else {
    
    //     $(".adult").hide();
    //     $(".child").show();
    
    // }

    // Show/Hide Adult/Child Inputs
    $('#adultType').on("click", function(){
        $(".adult").show();
        $(".child").hide();
    });

    $('#childType').on("click", function(){
        $(".adult").hide();
        $(".child").show();
    });


    // Form Submission    
    $("form").submit(function(e) {

        // Initialize Variables
        var zmi, bmi, bmiZScore, bmiPercentile, metsZScore, metsPercentile;

        // Prevent Post
        e.preventDefault();
        
        // Validate Input
        var input = $(this).validate(); 
        
        // If Input Is Valid
        if(input.valid()) {

            // Store Data & Create Object
            var userData = $("form").serializeObject();
            zmi = new ZMI(userData);

            // Determine If Child Or Adult
            if (userData.type == "child") {

                bmi = Math.round(zmi.bmi()*100)/100;
                bmiZScore = Math.round(zmi.bmiZScore()*100)/100;
                bmiPercentile = Math.round(zmi.bmiPercentile()*10)/10;
                metsZScore = Math.round(zmi.metsZScore()*100)/100;
                metsPercentile = Math.round(zmi.metsPercentile()*10)/10;

                // Display Child Data On Page
                $('#result').show().html(
                    '<table><tr><td>BMI<br /><span class="resultNum">' + bmi + '</span></td><td>BMI Z-Score<br /><span class="resultNum">' + bmiZScore + '</span></td><td>BMI Percentile<br /><span class="resultNum"> ' + bmiPercentile + '%</span></td></tr></table>' +
                    '<table><tr><td>MetS Z-Score<br /><span class="resultNum"> ' + metsZScore + '</span></td><td>MetS Percentile<br /><span class="resultNum">' + metsPercentile + "%</span></td></tr></table>"
                );

            } else if (userData.type == "adult") {

                metsZScore = Math.round(zmi.metsZScore()*100)/100;
                metsPercentile = Math.round(zmi.metsPercentile()*10)/10;

                // Display Adult Data On Page
                $('#result').show().html(
                    '<table><tr><td>MetS Z-Score<br /><span class="resultNum"> ' + metsZScore + '</span></td><td>MetS Percentile<br /><span class="resultNum">' + metsPercentile + "%</span></td></tr></table>"
                );

            }


        } else {
            
            // Return False & Validation Kicks In
            return false;

        }
    
    });
    
    // Log Calculations
    // console.log("BMI: " + zmi.bmi());
    // console.log("BMI Z-Score: " + zmi.bmiZScore());
    // console.log("BMI Percentile: " + zmi.bmiPercentile());
    // console.log("MetS Z-Score: " + zmi.metsZScore());
    // console.log("MetS Percentile: " + zmi.metsPercentile());

});