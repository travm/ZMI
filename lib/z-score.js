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
    console.log("Age: " + age);
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
                    
                    var x = popData[i];
                    console.log(x);

                    var z = ((bmi/popData[3]))

                }
            } 

        }

        console.log("You are male!");

    } else if(gender == "F") {

        // Z = ln(X/M)/S ,L=0
        for(var i = 0; i < popData.length; i++) {
            
            if(popData[i][0] == 2) {
                console.log(popData[i]);
            }
        }

        console.log("You are female!");

    } else {

    }

}