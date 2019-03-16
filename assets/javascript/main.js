$('document').ready( function() {
	//variables to store user input from index.html input form
	var searchZip="&zip=37213";
	//need to add search default to be today
	var searchDate = moment().add(2,"d").format("YYYY-MM-DD");
	// search for City State will be enabled when Google Maps API is implemented
	// var searchCityState;

    $("#sbmt-btn").on("click", function (event) {
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

    $(document).on("click", ".book-btn", function () {
        event.preventDefault();
        window.location="booking.html";
    }); 
});