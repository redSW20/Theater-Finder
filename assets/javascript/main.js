$('document').ready( function() {
	//variables to store user input from index.html input form
    var searchZip = "";
    var latlngZip = "";
	//need to add search default to be today
    var searchDate = moment().add(1,"d").format("YYYY-MM-DD");
    $('#movieDate').val(searchDate);
    console.log(searchDate);

	// search for City State 
    var searchPlace;
    
    // API queries
    var key = "AIzaSyA2BvFObbSrB2pxBv1kCapb-gId6gztVnY";
    var latResults;
    var lngResults;

    $("#sbmt-btn").on("click", function (event) {
        event.preventDefault();
        var date =  $('#movieDate').val().trim();
        // event.preventDefault();
        if (date == "") {
            searchDate = moment(date).format("YYYY-MM-DD");
        };
        var zip = $('#movieZIP').val().trim();
        if(zip != ""){
            searchZip = "&zip="+ zip;
            event.preventDefault();
            console.log(searchZip);
            makeAjaxCall();
            searchZip = $('#movieZIP').val('');
        } 

        else {
            searchPlace = $('#movieCityState').val().trim();

            event.preventDefault();

            // log results to console
            console.log(searchPlace);

            latlngAjaxCall();
            //clear fields
            
            searchPlace = $('#movieCityState').val('');
        }
    });
 
    function displayRuntime(str) {
        var hours = parseInt(str.substring(0,2));
        var minutes = parseInt(str.substring(3,5));
        return (hours * 60) + minutes;
    }
    //function to call api.
    function makeAjaxCall() {
        // console.log("showPics ...");
        // var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
        var limit = 10;
        var qryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + searchDate + searchZip + "&api_key=xw86j6eejrw4z8npzsxjwexx";
        

        console.log(qryURL);
        
        $.ajax({
            url: qryURL,
            method: "GET"
        }).then(function (response) {
          // $("results").text(JSON.stringify(response));
            console.log(response);   
            

            var table = $("#t1");

            for (var i = 0; i < 10; i++) {
                var rT = response[i].runTime;
                var rT = rT.substr(2);
                // console.log(rT);
                var title = response[i].title;
                var ratings = response[i].ratings;
                var rating = "Not Rated";
                if (ratings != null) {
                    rating = ratings[0].code;
                }

                var theater = response[i].showtimes[0].theatre.name;
                // console.log(theater);
                var genres = response[i].genres;
                genres = genres.toString().split(",").join(", ");

                var showtime = response[i].showtimes;
                var buttonCell = $("<td>");
                        for (var d = 0; d < showtime.length; d++) {
                            theater = showtime[d].theatre.name;
                            var link = $("<a>")
                            .attr("href","booking.html?title="+title+"&showtime="+moment(showtime[d].dateTime).format("MM/DD/YYYY%20HH:mm")+"&theater="+theater)
                            .addClass("btn btn-primary")
                            .text(moment(showtime[d].dateTime).format("HH:MM"));
                            // display.push(`<button class = "book-btn">${displayTimes[d]}</button>`)
                            buttonCell.append(link);
                        };
                       
                // };
                // console.log(displayTimes);
                console.log(link);
                                
                var row = $("<tr>");
                var colTitle = $("<td>").text(title);
                var colRating = $("<td>").text(rating);
                var colRuntime = $("<td>").text(displayRuntime(rT)+" min");
                var colGenre = $("<td>").text(genres);
                var colTheater = $("<td>").text(theater);
                row.append(colTitle);
                row.append(colRating);
                row.append(colRuntime);
                row.append(colGenre);
                row.append(colTheater);
                row.append(buttonCell);
                table.append(row);
        
                };
        });


    };


    // function to get location latitude and longitude
    function latlngAjaxCall () {
        //lookup with latlng
        // var qryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.617147,+-111.77682&key=" + key;
        //lookup to find geometriccenter
        var placeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchPlace + "&location_type=GEOMETRIC_CENTER&key=" + key;
        // var qryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"

        $.ajax({
            url: placeURL,
            method: "GET"
        }).then(function (response0) {
            latResults = response0.results[0].geometry.location.lat;
            lngResults = response0.results[0].geometry.location.lng;
            var latlngResults = latResults + ",+" + lngResults;
            console.log(response0);
            console.log(latResults);
            console.log(lngResults);


            // latlngAjaxCall();

            // function to get zip from returned latitude and longitude results
            function zipAjaxCall () {
                //lookup with latlng
                var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlngResults + "&key=" + key;
                //lookup to find geometriccenter
                // var qryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchPlace + "&location_type=GEOMETRIC_CENTER&key=" + key;
                // var qryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"
        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response1) {
                    for (i = 0; i < response1.results[0].address_components.length; i++) {
                        if (response1.results[0].address_components[i].types = 'postal_code' && /^\d{5}$/.test(response1.results[0].address_components[i].long_name.trim())) {
                            latlngZip = response1.results[0].address_components[i].long_name;
                            console.log(response1);

                            searchZip = "&zip=" + latlngZip;
                            
                            $('#movieZIP').val(latlngZip);
                            console.log(searchZip);
                            
                            makeAjaxCall();
                            // searchZip = $('#movieZIP').val('');
                            
                        // } else {
                            
                        //     console.log('still looping through zip codes.')
                        }
                    }
                });
                
            };
            
            zipAjaxCall();
            

        });
        
    };


    // $(document).on("click", ".book-btn", function () {
    //     event.preventDefault();
    //     window.location="booking.html";
    // }); 


});