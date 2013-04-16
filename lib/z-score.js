function calculateZscore(age, gender, bmi) {

    // PULL & PROCESSES CSV DATA FILE (.TXT)
    var popData = "Oh no! Population data wasn't loaded properly.";

    $.ajax({
        type: "GET",
        url: "data/data.txt",
        dataType: "text",
        async:false,
        success: function(data) { popData = processCSV(data); }
    });

    // for(var i = 0; i < popData.length; i++) {
    //     console.log(popData[i]);
    // }

    
    // X = BMI? Weight?
    // Z = ln(X/M)/S, L=0


    // Log all data to the console for reference
    console.log("// Calculate Z-Score Function");
    console.log("Age: " + age + " (Months)");
    console.log("Gender: " + gender);
    console.log("BMI: " + bmi); 
    if(age > 240) {
        age = 240;
        console.log("Effective Age: " + age);
    }
    

    if(gender == "M") {

        // Z = ((X/M)**L) - 1 / LS
        for(var i = 0; i < popData.length; i++) {       
            
            if(popData[i][0] == 1) {
                
                if(Math.round(popData[i][1]) == Math.round(age)) {
                    
                    // Stores Filtered Row Data
                    var x = popData[i];
                    console.log(x[3]);

                    var one = bmi/x[3];
                    var two = Math.pow(one, x[2]) - 1;
                    var z = two / (x[2] * x[4]);
                    console.log("Z-Score: " + z);

                }

            } 

        }

        console.log("Rendered Results For Male Data.");

    } else if(gender == "F") {

        // Z = ln(X/M)/S ,L=0
        for(var i = 0; i < popData.length; i++) {
            
            if(popData[i][0] == 2) {
                console.log(popData[i]);
            }
        }

        console.log("Rendered Results For Female Data.");

    } else {

    }

}