$('document').ready( function() {
	//variables to store user input from index.html input form
	var searchZip = "";
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
        // console.log(searchZip);
        // makeAjaxCall();
        // searchZip = $('#movieZIP').val('');
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

    //function to call api
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
                var ratings = response[i].ratings[0].code;
                var rating = "Not Rated"
                if (ratings == null) {
                    ratings = rating
                };

                var theater = response[i].showtimes[0].theatre.name;
                // console.log(theater);
                

                var showtime = response[i].showtimes;
                var times = [];
                for (var s = 0; s < showtime.length; s++) {
                    // console.log(showtime[s].dateTime);
                    
                          times.push(showtime[s].dateTime)
                };
                console.log(times);

                var displayTimes = [];
                for (let z = 0; z < times.length; z++) {
                    displayTimes.push(moment(times[z]).format("HH:MM"))
                        var display = [];
                        for (var d = 0; d < displayTimes.length; d++) {
                            
                            display.push(`<button class = "book-btn">${displayTimes[d]}</button>`)
                            
                        };
                };
                console.log(displayTimes);
                                


                table.append(
                    `<tr>
                    <th scope="row">${response[i].title}</th>
                    <td>${ratings}</td>
                    <td>${rT}</td>
                    <td>${response[i].genres}</td>
                    <td>${theater}</td>
                    <td>${display}</td>
                    </tr>`
            )};
        });


    };

    $(document).on("click", ".book-btn", function (event) {
        event.preventDefault();
        window.location="booking.html";
    }); 
    

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
                            searchZip = response1.results[0].address_components[i].long_name;
                            console.log(response1);
                            
                            $('#movieZIP').val(searchZip);
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



});