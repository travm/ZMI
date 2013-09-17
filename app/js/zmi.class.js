// SERIALIZE FORM (jQuery Dependent)
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// DOCUMENT READY
$(function(){

    var zmi;

    $('form').submit(function() {
        
        var userData = $('form').serializeObject();

        zmi = new ZMI(userData);

        console.log(zmi.bmi());

        //$('#result').text();
        return false;
    });
});


// ZMI CONSTRUCTOR
function ZMI(input) {
    "use strict";
    
    //console.log(input);

    // Process CSV
    this.processCSV = function(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {

                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        return lines;
    }

    // BMI
    this.bmi = function() {
        "use strict";

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
            h = input.height * 0.0254;      
        } else {
            h = input.height;
        }

        // Store BMI Result
        var result = w/(h*h);

        // Check Result For Errors
        if(isNaN(result)) {
            return;
        } else {
            return result;
        }
    };

    // BMI Z-Score
    this.bmiz = function (age, gender, bmi) {
        // Pull & process CSV data file (.txt)
        var popData = "Oh no! Population data wasn't loaded properly.";
        $.ajax({
            type: "GET",
            url: "data/data.txt",
            dataType: "text",
            async:false,
            success: function(data) { popData = this.processCSV(data); }
        });

        /*
         * Loop Through Data, Perform Calculation
         * If L != 0 then use: Z = ((X/M)**L) - 1 / LS
         * If L = 0 then use: Z = ln(X/M)/S (Not currently needed.)
         */
        if(gender == "M") {
            for(var i = 0; i < popData.length; i++) {        
                if(popData[i][0] == 1) {
                    
                    // Data From CSV Is In Half Months
                    // Adding Half Month To Age To Match
                    if(popData[i][1] == age*1+0.5) {
                        
                        // Stores Filtered Row Data
                        var x = popData[i];

                        // Calculates Z-Score
                        var one = bmi/x[3];
                        var two = Math.pow(one, x[2]) - 1;
                        var z = two / (x[2] * x[4]);

                        return z;
                    }
                } 
            }
        } else if(gender == "F") {
            for(var i = 0; i < popData.length; i++) {        
                if(popData[i][0] == 2) {
                    
                    // Data From CSV Is In Half Months
                    // Adding Half Month To Age To Match
                    if(popData[i][1] == age + 0.5) {
                        
                        // Stores Filtered Row Data
                        var x = popData[i];
                        console.log(x);

                        // Calculates Z-Score
                        var one = bmi/x[3];
                        var two = Math.pow(one, x[2]) - 1;
                        var z = two / (x[2] * x[4]);

                        return z;
                    }
                } 
            }
        } else {
            var error = "You must choose a gender.";
            return error;
        }
    };

    // MetS Z-Score
    this.metsz = function (gender, race, bmiZScore, tri, hdl, sbp, glu) {

        // Initialize variables
        var metsZScore, metsPercentage;

        // Determine gender and race and insert variables into the correct formula
        if(gender == "M") {

            if(race == "white") {
                // WHITE MALE
                // -4.931+0.2804*B4-0.0257*B6+0.0189*B7+0.624*LN(B5)+0.014*B8
                metsZScore = -4.931 + 0.2804 * bmiZScore - 0.0257 * hdl + 0.0189 * sbp + 0.624 * Math.log(tri) + 0.014 * glu;
            } else if (race == "black") {
                // AFRICAN AMERICAN MALE
                // -4.7544+0.2401*B4-0.0284*B6+0.0134*B7+0.6773*LN(B5)+0.0179*B8
                metsZScore = -4.7544 + 0.2401 * bmiZScore - 0.0284 * hdl + 0.0134 * sbp + 0.6773 * Math.log(tri) + 0.0179 * glu;
            } else {
                // HISPANIC MALE
                // -3.2971+0.293*B4-0.0315*B6+0.0109*B7+0.6137*LN(B5)+0.0095*B8
                metsZScore = -3.2971 + 0.293 * bmiZScore - 0.0315 * hdl + 0.0109 * sbp + 0.6137 * Math.log(tri) + 0.0095 * glu;
            }

        } else if(gender == "F") {

            if(race == "white") {
                // WHITE FEMALE
                // -4.3757+0.4849*B4-0.0176*B6+0.0257*B7+0.3172*LN(B5)+0.0083*F8
                metsZScore = -4.3757 + 0.4849 * bmiZScore - 0.0176 * hdl + 0.0257 * sbp + 0.3172 * Math.log(tri) + 0.0083 * glu;
            } else if (race == "black") {
                // AFRICAN AMERICAN FEMALE
                // -3.7145+0.5136*B4-0.019*B6+0.0131*B7+0.4442*LN(B5)+0.0108*B8
                metsZScore = -3.7145 + 0.5136 * bmiZScore - 0.019 * hdl + 0.0131 * sbp + 0.4442 * Math.log(tri) + 0.0108 * glu;
            } else {
                // HISPANIC FEMALE
                // -4.7637+0.352*B4-0.0263*B6+0.0152*B7+0.691*LN(B5)+0.0133*H8
                metsZScore = -4.7637 + 0.352 * bmiZScore - 0.0263 * hdl + 0.0152 * sbp + 0.691 * Math.log(tri) + 0.0133 * glu;
            }
        } else {
            var error = "Gender was not set.";
            return error;
        }
        
        console.log("MetS Z-Score: " + metsZScore);
        return metsZScore;
    };

}

// Cross Browser Console.log()
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
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