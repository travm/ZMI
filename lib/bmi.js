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

// Cache Event Elements
var calculate = $('#calculate');
var result = $('#result');

// RENDER SELECTED UNIT
calculate.on('click', function(){
    
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var weightUnit = findUnit(document.getElementsByName('weightUnit'));
    var heightUnit = findUnit(document.getElementsByName('heightUnit'));
    var w;
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

    // Simple validation (Beef up, later!)
    if (weight.length && height.length) {
        result.text('Your BMI is: ' + w/(h*h));
    } else {
        result.text("Please input your weight and height.");
    }

    
});





