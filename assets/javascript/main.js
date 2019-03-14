$(document).ready(function () {



    $(".sbmt-btn").on("click", function (event) {
        event.preventDefault();




        // function makeAjaxCall() {
        var limit = 10;
        var qryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-14&zip=37210&api_key=mdd9zjstfnweg7aereckewe6";
        console.log(qryURL);

        $.ajax({
            url: qryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("results").text(JSON.stringify(response));
            console.log(response[0]);
            console.log(response[0].title);


            var table = $("#t1");
                                // for (var j = 0; j < (response.data).length; j++) {
                                //     $('#car-images').append(`    
                                //     <div class="card m-2" style="width: 18rem;">
                                //         <img class="card-img-top" src="${response.data[j].images.fixed_height_still.url}" alt="${response.data[j].title}" data-alt="${response.data[j].images.fixed_height.url}">
                                //         <div class="card-body">
                                //         <h5 class="card-title">${response.data[j].title}</h5>
                                //         <p class="card-text">Rating: ${response.data[j].rating}
                                //         <br>Score: ${response.data[j]._score}</p>
                                //         </div>
                                //     </div>`);
                                // };
                   // <td>$<DELETE ME WHEN IF STATEMENT TO PREVENT READ ERROR FROM LACK OF RATING CODE>{response[i].ratings.code}</td>
// 
// 
// 
            
for (var i = 0; i < response.length; i++) {
    
    

            table.append(
                `
            <tr>
                <th scope="row">${response[i].title}</th>
                <td>INSERT MOVIE RUNTIME HERE</td>
                <td>${response[i].genres}</td>
                <td> INSERT RESPONSE TIME MOMENT CONVERSION HERE </td>
            </tr>`
            )};
            //   table.append(tr);
        });

        // }

        // makeAjaxCall();




    })
});