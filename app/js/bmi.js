// Convert Inches to Centimeters
function convertHeight(inches) {
    "use strict";
    return inches/0.39370;
}

// Convert Pounds to Kilograms
function convertWeight(pounds) {
    "use strict";
    return pounds/2.20462262185;
}

// Find Unit of Measurement
function findUnit(unit) {
    "use strict";
    var output;
    for (var i=0; i<unit.length; i++) {
        if(unit[i].checked === true) {
            output =  unit[i].value;
        }
    }
    return output;
}

// Calculate BMI after inputs have been converted
function calculateBMI(weight, weightUnit, height, heightUnit) {
    "use strict";
    
    // Log BMI data to the console for reference
    //console.log("// BMI Data");
    //console.log("Weight: " + weight + weightUnit);
    //console.log("Height: " + height + heightUnit);

    // Initialize variables
    var w;
    var h;
    
    // If measurement is in pounds, do the math.
    if(weightUnit == "lbs") {
        w = convertWeight(weight);
        //console.log(w + "kg");        
    } else {
        w = weight;
    }
    
    // If height measurement is in inches, do the math.
    if(heightUnit == "in") {
        h = convertHeight(height) / 100;
        //console.log(h + "cm");        
    } else {
        h = height / 100;
    }

    // Store BMI Result
    var result = w/(h*h);

    // Check Result For Errors
    if(isNaN(result)) {
        //console.log("Weight and height was not numerical.")
        return;
    } else {
        return result;
    }
}





