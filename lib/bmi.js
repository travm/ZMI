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

function calculateBMI() {

    // Cached Variables
    // var form = document.forms[0];
    // var weight = form.elements['weight'].value;
    // var weightUnit = form.elements['weightUnit'].value;
    // var height = form.elements['height'].value;
    // var heightUnit = findUnit(form.elements['heightUnit']);

    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var weightUnit = findUnit(document.getElementsByName('weightUnit'));
    var heightUnit = findUnit(document.getElementsByName('heightUnit'));
    var w;
    var h;
    //console.log('Weight is measured in: ' + weightUnit + '\nHeight is measured in: ' + heightUnit);
    
    // If measurement is in pounds, do the math.
    if(weightUnit == 'lbs') {
        w = convertWeight(weight);
        console.log(w + "kg");        
    } else {
        w = weight;
        console.log(w + "kg");     
    }
    
    // If height measurement is in inches, do the math.
    if(heightUnit == 'in') {
        h = convertHeight(height);
        console.log(h + "m");        
    } else {
        h = height;
        console.log(h + "m");     
    };

    // Store BMI Result
    var result = w/(h*h);

    // Check Result For Errors
    if(isNaN(result)) {
        return "Please enter a numerical weight and height."
    } else {
        return result;
    }


}





