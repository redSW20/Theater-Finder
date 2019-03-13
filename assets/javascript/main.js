
function makeAjaxCall() {
    // console.log("showPics ...");
    // var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
    var limit = 10;
    var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-13&zip=37027&api_key=mdd9zjstfnweg7aereckewe6";

    console.log(qryURL);
    
    $.ajax({
        url: qryURL,
        method: "GET"
    }).then( function(response) {
        console.log(JSON.stringify(response));
        $("results").text(JSON.stringify(response));
    }); 

}

makeAjaxCall();

