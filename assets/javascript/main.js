$('document').ready( function() {
	//variables to store user input from index.html input form
	var searchZip="&zip=37213";
	//need to add search default to be today
    var searchDate = moment().add(1,"d").format("YYYY-MM-DD");
    $('#movieDate').val(searchDate);
    console.log(searchDate);
	// search for City State will be enabled when Google Maps API is implemented
	// var searchCityState;

    $("#sbmt-btn").on("click", function (event) {
        event.preventDefault();
        var date =  $('#movieDate').val().trim();
        event.preventDefault();
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
                // var times = [];
                // for (var s = 0; s < showtime.length; s++) {
                //     // console.log(showtime[s].dateTime);
                    
                //           times.push(showtime[s].dateTime)
                // };
                // console.log(times);

                // var displayTimes = [];
                var buttonCell = $("<td>");
                // for (let z = 0; z < showtime.length; z++) {
                    // displayTimes.push(moment(times[z]).format("HH:MM"));
                        // var display = [];
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


            //     table.append(
            //         `<tr>
            //         <th scope="row">${response[i].title}</th>
            //         <td>${ratings}</td>
            //         <td>${rT}</td>
            //         <td>${response[i].genres}</td>
            //         <td>${theater}</td>
            //         <td>${display}</td>
            //         </tr>`
            // )
                
        
                };
        });


    };


    // $(document).on("click", ".book-btn", function () {
    //     event.preventDefault();
    //     window.location="booking.html";
    // }); 


});