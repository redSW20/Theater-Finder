$('#car-buttons').on('click', '.car-button', function() {
    $('#car-images').empty();
    var btnChoice = ($(this).attr('data-car'));
    var queryURL = "http://api.fandango.com/<version>?op=<operation>&<parameter list>&apikey=<apikey>&sig=<sig>" + btnChoice + "&api_key=3q27vpmvaz5hcduqfazyjp3p";

    //shared secret for fandango api: gWkgYWhRBA
    //api key for fandango: 3q27vpmvaz5hcduqfazyjp3p

  // Ajax call to retrieve GIF data from GIPHY and store it in 'response'
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL);
    console.log(response);
    console.log(btnChoice);
    
    // // for loop to display the images and information on the page returned from GIPHY
    // for (var j = 0; j < (response.data).length; j++) {
    //   $('#car-images').append(`    
    //     <div class="card m-2" style="width: 18rem;">
    //       <img class="card-img-top" src="${response.data[j].images.fixed_height_still.url}" alt="${response.data[j].title}" data-alt="${response.data[j].images.fixed_height.url}">
    //       <div class="card-body">
    //         <h5 class="card-title">${response.data[j].title}</h5>
    //         <p class="card-text">Rating: ${response.data[j].rating}
    //         <br>Score: ${response.data[j]._score}</p>
    //       </div>
    //     </div>`);
    // };
  });
  });