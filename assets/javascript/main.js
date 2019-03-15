$('document').ready( function() {
//variables to store user input from index.html input form
var searchZip;
//need to add search default to be today
var searchDate;
// search for City State will be enabled when Google Maps API is implemented
// var searchCityState;



//on submit button on click call the api based on search parameters entered in form
    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        searchZip = $('#movieZIP').val().trim();
        searchDate = $('#movieDate').val().trim();
        console.log(searchZip);
        makeAjaxCall();
        searchZip = $('#movieZIP').val('');
    });

    //function to call api
    function makeAjaxCall() {
        // console.log("showPics ...");
        // var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
        var limit = 10;
        var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + searchDate + "&zip=" + searchZip + "&api_key=mdd9zjstfnweg7aereckewe6";

        console.log(qryURL);
        
        $.ajax({
            url: qryURL,
            method: "GET"
        }).then( function(response) {
            console.log(JSON.stringify(response));
            $("results").text(JSON.stringify(response));
        }); 

    };

}); 