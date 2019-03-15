// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQHYc2AoFXqoxwnOJXL1xgl5-P-jiBRsk",
    authDomain: "team6-f2e21.firebaseapp.com",
    databaseURL: "https://team6-f2e21.firebaseio.com",
    projectId: "team6-f2e21",
    storageBucket: "team6-f2e21.appspot.com",
    messagingSenderId: "633616272136"
};
firebase.initializeApp(config);
var database = firebase.database();

//these are placeholders for movie params
var movie = "The Godfather";
var theater = "Regal 12";
var movieTime = "04/01/2019 08:00";

var prices = [12, 8, 5, 9];
var charges = [0, 0, 0, 0];
var seatHolder = [0, 0, 0, 0];
function getSum(total, num) {
    return total + num;
}
function calcTotal(event) {
    var id = event.target.id;
    var numTickets = $("#" + id).val();
    var arr = event.target.id.split("-");
    var priceIdx = arr[1];
    var tixType = arr[0].toLowerCase();
    var total = numTickets * prices[priceIdx];
    charges[priceIdx] = total;
    seatHolder[priceIdx] = parseInt(numTickets);
    $("#" + tixType + "total").text("$" + total.toFixed(2));
    var grandtotal = charges.reduce(getSum);
    $("#grandtotal").text("Total:  $" + grandtotal.toFixed(2));
    if(grandtotal > 0) {
        $("#pay-btn").css("visibility","visible");
    }
    else {
        $("#pay-btn").css("visibility","hidden");
        $("#pay-card").css("visibility","hidden");
    }
    //   var id = this.id;
    console.log(numTickets);
}
var newBooking = {
    type: "",
    name: "",
    num: "",
    expiry: "",
    zip: "",
    amt: 0,
    seats: 0,
    movie: "",
    theater: "",
    time: "",
    booking: ""
};
function showPayCard() {
    $("#pay-card").css("visibility","visible");
}
function processPayment(event) {
    event.preventDefault();
    console.log("payment");
    var cType = $("form :radio").val().trim(); 
    var cName = $("#name-input").val().trim(); 
    var cNumber = $("#cardnumber-input").val().trim(); 
    var cExpiry = $("#expire-input").val().trim(); 
    var cZip = $("#zip-input").val().trim(); 
    var totalSeats = seatHolder.reduce(getSum);
    var grandtotal = charges.reduce(getSum);

    console.log(cType);
    console.log(cName);
    console.log(cNumber);
    console.log(cExpiry);
    console.log(cZip);

    newBooking.type = cType;
    newBooking.name = cName;
    newBooking.num = cNumber;
    newBooking.expiry = cExpiry;
    newBooking.zip = cZip;
    newBooking.seats = totalSeats; 
    newBooking.amt = grandtotal;
    newBooking.booking = moment().format("X");
    
    newBooking.movie = movie;
    newBooking.time = moment(movieTime).format("X");
    newBooking.theater = theater;

    database.ref().push(newBooking);
 
};

$(".booknumselect").change(".booknumselect", calcTotal);
$("#payment-btn").click(processPayment);
$("#pay-btn").click(showPayCard);

