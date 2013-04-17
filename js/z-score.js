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

    // LOG DATA TO CONSOLE FOR REFERENCE
    console.log("// Calculate Z-Score Function");
    console.log("Age: " + age + " (Months)");
    console.log("Gender: " + gender);
    console.log("BMI: " + bmi); 
    if(age > 240) {
        age = 240;
        console.log("Effective Age: " + age);
    }
    

    // Loop Through Data, Perform Calculation
    // If L != 0 then use: Z = ((X/M)**L) - 1 / LS
    // If L = 0 then use: Z = ln(X/M)/S (Not currently needed.)
    if(gender == "M") {

        for(var i = 0; i < popData.length; i++) {       
            
            if(popData[i][0] == 1) {
                
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
                    console.log("Z-Score: " + z);
                    console.log("Rendered Results For Male Data.");

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
                    console.log("Z-Score: " + z);
                    console.log("Rendered Results For Female Data.");

                    return z;

                }

            } 

        }


    } else {

        console.log("How in the world did you not choose a gender?");

    }

}