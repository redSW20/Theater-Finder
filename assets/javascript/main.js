$('document').ready( function() {
//variables to store user input from index.html input form
var searchZip;
// var searchCityState = $('#movieCityState');
// var searchMovie = $('#movieTitle');
// var searchDate = $('#movieDate');
// var searchTimes = $('#movieTime');
// var searchRating = $('#ratingSelector');


//on submit button on click call the api based on search parameters entered in form
$('#submitBtn').on('click', function(event) {
    event.preventDefault();
    searchZip = $('#movieZIP').val().trim();
    console.log(searchZip);
    makeAjaxCall();
});

function makeAjaxCall() {
    // console.log("showPics ...");
    // var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
    var limit = 10;
    var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-13&zip=" + searchZip + "&api_key=mdd9zjstfnweg7aereckewe6";

    console.log(qryURL);
    
    $.ajax({
        url: qryURL,
        method: "GET"
    }).then( function(response) {
        console.log(JSON.stringify(response));
        $("results").text(JSON.stringify(response));
    }); 

};

// makeAjaxCall();

}); 