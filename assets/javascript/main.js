$(document).ready(function () {

    $(".sbmt-btn").on("click", function (event) {
        event.preventDefault();

        // function makeAjaxCall() {
        var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-20&zip=37076&api_key=xw86j6eejrw4z8npzsxjwexx";
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


    })

    $(document).on("click", ".book-btn", function () {
        event.preventDefault();
        window.location="booking.html";
    }); 
    //before push to merge, fix path issue for booking html---



});