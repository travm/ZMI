// Convert Inches to Centimeters
function convertHeight(inches) {
    return inches * 0.0254;
}

// Convert Pounds to Kilograms
function convertWeight(pounds) {
    return pounds/2.20462262185;
}

// Find Unit of Measurement
function findUnit(unit) {
    var output;           
    for (i=0; i<unit.length; i++) {
        if(unit[i].checked === true) {
            output =  unit[i].value;
        }
    }
    return output;
}

// RENDER SELECTED UNIT

function calculateBMI(weight, weightUnit, height, heightUnit) {
    
    // Log BMI data to the console for reference
    console.log("// BMI Data");
    console.log("Weight: " + weight + weightUnit);
    console.log("Height: " + height + heightUnit);

    // Init Variables
    var w;
    var h;
    
    // If measurement is in pounds, do the math.
    if(weightUnit == 'lbs') {
        w = convertWeight(weight);
        console.log(w + "kg");        
    } else {
        w = weight;    
    }
    
    // If height measurement is in inches, do the math.
    if(heightUnit == 'in') {
        h = convertHeight(height);
        console.log(h + "m");        
    } else {
        h = height;    
    };

    // Store BMI Result
    var result = w/(h*h);

    // Check Result For Errors
    if(isNaN(result)) {
        console.log("Weight and height was not numerical.")
        return;
    } else {
        return result;
    }


}





