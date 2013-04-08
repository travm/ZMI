$(function(){

    // PULL & PROCESS DATA FILE
    $.ajax({
        type: "GET",
        url: "data/data.txt",
        dataType: "text",
        success: function(data) {processData(data)}
    });

    //console.log(t);

});