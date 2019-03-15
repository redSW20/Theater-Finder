$(document).ready(function () {



    $(".sbmt-btn").on("click", function (event) {
        event.preventDefault();




        // function makeAjaxCall() {
        var limit = 10;
        var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-20&zip=37076&api_key=mdd9zjstfnweg7aereckewe6";
        console.log(qryURL);

        $.ajax({
            url: qryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("results").text(JSON.stringify(response));
            console.log(response[0]);   
            


            var table = $("#t1");
                   // <td>$<DELETE ME WITH AN IF STATEMENT TO PREVENT READ ERROR FROM LACK OF RATING CODE>{response[i].ratings.code}</td>

            for (var i = 0; i < response.length; i++) {
                var rT = response[i].runTime;
                var rT = rT.substr(2);
                console.log(rT);



            table.append(
                `<tr>
                <th scope="row">${response[i].title}</th>
                <td>${rT}</td>
                <td>${response[i].genres}</td>
                <td> INSERT SHOWTIMES HERE</td>
                </tr>`
            )};
        });

        // }

        // makeAjaxCall();




    })
});