function calculateZscore(age, gender, bmi) {

    // PULL & PROCESS DATA FILE
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

    if(gender == "M") {

        // Z = ((X/M)**L - 1 / LS

        for(var i = 0; i < popData.length; i++) {
            console.log(popData[i]);
        }

        console.log("You are male!");

    } else {

        // Z = ln(X/M)/S ,L=0
        console.log("You are female!");

    }

}