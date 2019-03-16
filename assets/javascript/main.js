$('document').ready( function() {
	//variables to store user input from index.html input form
	var searchZip="&zip=37213";
	//need to add search default to be today
	var searchDate = moment().add(2,"d").format("YYYY-MM-DD");
	// search for City State will be enabled when Google Maps API is implemented
	// var searchCityState;



	//on submit button on click call the api based on search parameters entered in form
    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        var date =  $('#movieDate').val().trim();
        if (date != "") {
            searchDate = moment(date).format("YYYY-MM-DD");
        }
        var zip = $('#movieZIP').val().trim();
        if(zip != ""){
            searchZip = "&zip="+ zip;  
        }
        console.log(searchZip);
        makeAjaxCall();
        searchZip = $('#movieZIP').val('');
    });

    //function to call api
    function makeAjaxCall() {
        // console.log("showPics ...");
        // var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
        var limit = 10;
        var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + searchDate + searchZip + "&api_key=xw86j6eejrw4z8npzsxjwexx";
        var proxyURL = "https://cors-anywhere.herokuapp.com/"

        console.log(qryURL);
        
        $.ajax({
            url: proxyURL + qryURL,
            method: "GET"
        }).then(function (response) {
            // $("#results").text(JSON.stringify(response));
            // console.log(response);   
            // console.log(response[0]);   
            var table = $("#t1");
                   // <td>$<DELETE ME WITH AN IF STATEMENT TO PREVENT READ ERROR FROM LACK OF RATING CODE>{response[i].ratings.code}</td>
            var tbody = $("#tablebody");
            // for (var i = 0; i < response.length; i++) {
            for (var i = 0; i < 10; i++) {
                console.log(i);
                var rT = response[i];
                console.log(rT);
                var title = rT.title;
                var ratings = rT.ratings;
                var rating = "not rated";
                if(ratings != null) {
                    rating = ratings[0].code;
                }
                var runtime = rT.runTime; 
                var genres = rT.genres;
                // var genre = "";
                // for(var j = 0;j < genres.length;j++){
                //     genre += genre+ " "; 
                // }
                //display showtimes later
                var showtimes = rT.showtimes;
                // var rT = rT.substr(2);

                var row = $("<tr>");
                var colTitle = $("<td>").text(title);
                var colRating = $("<td>").text(rating);
                var colRuntime = $("<td>").text(runtime);
                var colGenre = $("<td>").text(genres);
                row.append(colTitle);
                row.append(colRating);
                row.append(colRuntime);
                row.append(colGenre);
                tbody.append(row);

            // table.append(
            //     `<tr>
            //     <th scope="row">${response[i].title}</th>
            //     <td>${rT}</td>
            //     <td>${response[i].genres}</td>
            //     <td> INSERT SHOWTIMES HERE</td>
            //     </tr>`
            // )
            }
        });

    };

}); 
