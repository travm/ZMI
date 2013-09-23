// Cross Browser Console.log()
(function() {
    "use strict";

    var method;
    var noop = function () {};
    var methods = [
        "assert", "clear", "count", "debug", "dir", "dirxml", "error",
        "exception", "group", "groupCollapsed", "groupEnd", "info", "log",
        "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
        "timeStamp", "trace", "warn"
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// SERIALIZE FORM (jQuery Dependent)
$.fn.serializeObject = function()
{
    "use strict";
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || "");
        } else {
            o[this.name] = this.value || "";
        }
    });
    return o;
};

// DOCUMENT READY
$(function(){

    "use strict";

    var zmi;

    $("form").submit(function() {
        
        var userData = $("form").serializeObject();

        zmi = new ZMI(userData);

        console.log("BMI: " + zmi.bmi());
        console.log("BMI Z-Score: " + zmi.bmiZScore());
        console.log("BMI Percentile: " + zmi.bmiPercentile());
        console.log("MetS Z-Score: " + zmi.metsZScore());
        console.log("MetS Percentile: " + zmi.metsPercentile());

        //$('#result').text();
        return false;
    });
});


// ZMI CONSTRUCTOR
function ZMI(input) {
    "use strict";

    console.log(input);
    
    // Reference to 'this' 
    var self = this;

    // Process CSV
    this.processCSV = function(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(",");
        var lines = [];

        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(",");
            if (data.length == headers.length) {

                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        return lines;
    };

    // Process Data
    this.processData = function() {
        // Default Data Variable
        var popData = "Population data wasn't loaded properly.";
        
        // Pull & Process CSV Data File (.txt)
        $.ajax({
            type: "GET",
            url: "data/data.txt",
            dataType: "text",
            async:false,
            success: function(data) { popData = self.processCSV(data); }
        });

        return popData;
    };

    // BMI
    this.bmi = function() {

        // Initialize variables
        var w;
        var h;
        
        // If measurement is in pounds, do the math.
        if(input.weightUnit == "lbs") {
            w = input.weight/2.20462262185;
        } else {
            w = input.weight;
        }
        
        // If height measurement is in inches, do the math.
        if(input.heightUnit == "in") {
            h = (input.height/0.39370) / 100;
        } else {
            h = input.height / 100;
        }

        // Store BMI Result
        var result = w/(h*h);

        // Check Result For Errors
        if(isNaN(result)) {
            return;
        } else {
            //return Math.round(result*100)/100;
            return result;
        }
    };

    // BMI Z-Score
    this.bmiZScore = function () {

        // Calculate Age (Moment.JS Dependency)
        var birthdate = moment(input.birthdate);
        var appointment = moment(input.appointment);
        var age = appointment.diff(birthdate, "months");
        var data = this.processData();    

        /*
         * Loop Through Data, Perform Calculation
         * If L != 0 then use: Z = ((X/M)**L) - 1 / LS
         * If L = 0 then use: Z = ln(X/M)/S (Not currently needed.)
         */
        if(input.gender == "M") {
            for(var i = 0; i < data.length; i++) {
                if(data[i][0] == 1) {
                    
                    // Data From CSV Is In Half Months
                    // Adding Half Month To Age To Match
                    if(data[i][1] == age*1+0.5) {
                        
                        // Stores Filtered Row Data
                        var x = data[i];

                        // Calculates Z-Score
                        var one = this.bmi()/x[3];
                        var two = Math.pow(one, x[2]) - 1;
                        var z = two / (x[2] * x[4]);

                        // Return Rounded Z-Score
                        //return Math.round(z*100)/100;
                        return z;
                    }
                }
            }
        } else if(input.gender == "F") {
            for(var i = 0; i < data.length; i++) {
                if(data[i][0] == 2) {
                    
                    // Data From CSV Is In Half Months
                    // Adding Half Month To Age To Match
                    if(data[i][1] == age*1+0.5) {
                        
                        // Stores Filtered Row Data
                        var x = data[i];

                        // Calculates Z-Score
                        var one = this.bmi()/x[3];
                        var two = Math.pow(one, x[2]) - 1;
                        var z = two / (x[2] * x[4]);

                        // Return Rounded Z-Score
                        return Math.round(z*100)/100;
                    }
                }
            }
        } else {
            var error = "You must choose a gender.";
            return error;
        }
    };

    //BMI Percentile
    this.bmiPercentile = function () {
        var z = this.bmiZScore();
        var p = 100*(1/(1+Math.exp(-0.07056 * Math.pow(z, 3) - (1.5976*z))));
        //return Math.round(p*10)/10;
        return p; 
    };

    // MetS Z-Score
    this.metsZScore = function () {

        // Initialize variables
        var z;

        // Determine gender and race and insert variables into the correct formula
        if(input.gender == "M") {

            if(input.race == "white") {
                // WHITE MALE
                // -4.931+0.2804*B4-0.0257*B6+0.0189*B7+0.624*LN(B5)+0.014*B8
                z = -4.931 + 0.2804 * this.bmiZScore() - 0.0257 * input.hdl + 0.0189 * input.sbp + 0.624 * Math.log(input.triglyceride) + 0.014 * input.glucose;
            } else if (input.race == "black") {
                // AFRICAN AMERICAN MALE
                // -4.7544+0.2401*B4-0.0284*B6+0.0134*B7+0.6773*LN(B5)+0.0179*B8
                z = -4.7544 + 0.2401 * this.bmiZScore() - 0.0284 * input.hdl + 0.0134 * input.sbp + 0.6773 * Math.log(input.triglyceride) + 0.0179 * input.glucose;
            } else {
                // HISPANIC MALE
                // -3.2971+0.293*B4-0.0315*B6+0.0109*B7+0.6137*LN(B5)+0.0095*B8
                z = -3.2971 + 0.293 * this.bmiZScore() - 0.0315 * input.hdl + 0.0109 * input.sbp + 0.6137 * Math.log(input.triglyceride) + 0.0095 * input.glucose;
            }

        } else if(input.gender == "F") {

            if(input.race == "white") {
                // WHITE FEMALE
                // -4.3757+0.4849*B4-0.0176*B6+0.0257*B7+0.3172*LN(B5)+0.0083*F8
                z = -4.3757 + 0.4849 * this.bmiZScore() - 0.0176 * input.hdl + 0.0257 * input.sbp + 0.3172 * Math.log(input.triglyceride) + 0.0083 * input.glucose;
            } else if (input.race == "black") {
                // AFRICAN AMERICAN FEMALE
                // -3.7145+0.5136*B4-0.019*B6+0.0131*B7+0.4442*LN(B5)+0.0108*B8
                z = -3.7145 + 0.5136 * this.bmiZScore() - 0.019 * input.hdl + 0.0131 * input.sbp + 0.4442 * Math.log(input.triglyceride) + 0.0108 * input.glucose;
            } else {
                // HISPANIC FEMALE
                // -4.7637+0.352*B4-0.0263*B6+0.0152*B7+0.691*LN(B5)+0.0133*H8
                z = -4.7637 + 0.352 * this.bmiZScore() - 0.0263 * input.hdl + 0.0152 * input.sbp + 0.691 * Math.log(input.triglyceride) + 0.0133 * input.glucose;
            }
        } else {
            var error = "Gender was not set.";
            return error;
        }
        
        //return Math.round(z*100)/100;
        return z;
    };

    //MetS Percentile
    this.metsPercentile = function () {
        var z = this.metsZScore();
        var p = 100*(1/(1+Math.exp(-0.07056 * Math.pow(z, 3) - (1.5976*z))));
        //return Math.round(p*10)/10;
        return p;
    };

}