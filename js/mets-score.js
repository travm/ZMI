function calculateMets(race, zscore, tri, hdl, sbp, glu) {

// LOG
    // Log all data to the console for reference
    console.log("// Calculate MetS Score Function");
    console.log("Race: " + race);
    console.log("Gender: " + gender);
    console.log("Z-Score: " + zScore); 
    if(age > 240) {
        age = 240;
        console.log("Effective Age: " + age);
    }


// LEGEND (For Variable Creation)
    // B4 = BMI Z-Score
    // B5 = Fasting Triglyceride
    // B6 = HDL
    // B7 = SBP
    // B8 = Fasting Glucose
    
    var metsScore;
    var metsPercent;

    if(gender == "M") {

        if(race == "white") {
            // WHITE MALE
            // -4.931+0.2804*B4-0.0257*B6+0.0189*B7+0.624*LN(B5)+0.014*B8
            metsScore = -4.931 + 0.2804 * zScore - 0.0257 * hdl + 0.0189 * sbp + 0.624 * Math.log(tri) + 0.014 * glu;
        } else if (race == "black") {
            // AFRICAN AMERICAN MALE
            // -4.7544+0.2401*B4-0.0284*B6+0.0134*B7+0.6773*LN(B5)+0.0179*B8
            metsScore = -4.7544 + 0.2401 * zScore - 0.0284 * hdl + 0.0134 * sbp + 0.6773 * Math.log(tri) + 0.0179 * glu;
        } else {
            // HISPANIC MALE
            // -3.2971+0.293*B4-0.0315*B6+0.0109*B7+0.6137*LN(B5)+0.0095*B8
            metsScore = -3.2971 + 0.293 * zScore - 0.0315 * hdl + 0.0109 * sbp + 0.6137 * Math.log(tri) + 0.0095 * glu;
        }

    } else if(gender == "F") {

        if(race == "white") {
            // WHITE FEMALE
            // -4.3757+0.4849*B4-0.0176*B6+0.0257*B7+0.3172*LN(B5)+0.0083*F8
            metsScore = -4.3757 + 0.4849 * zScore - 0.0176 * hdl + 0.0257 * sbp + 0.3172 * Math.log(tri) + 0.0083 * glu;
        } else if (race == "black") {
            // AFRICAN AMERICAN FEMALE
            // -3.7145+0.5136*B4-0.019*B6+0.0131*B7+0.4442*LN(B5)+0.0108*B8
            metsScore = -3.7145 + 0.5136 * zScore - 0.019 * hdl + 0.0131 * sbp + 0.4442 * Math.log(tri) + 0.0108 * glu;
        } else {
            // HISPANIC FEMALE
            // -4.7637+0.352*B4-0.0263*B6+0.0152*B7+0.691*LN(B5)+0.0133*H8
            metsScore = -4.7637 + 0.352 * zScore - 0.0263 * hdl + 0.0152 * sbp + 0.691 * Math.log(tri) + 0.0133 * glu;
        }

    }

    console.log(metsScore);
    
}