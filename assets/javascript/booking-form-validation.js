// $(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"

  $("#payform").submit(function(e) {
    e.preventDefault();
}).validate


//   $("form[name='payform']").validate
  ({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      typeRadio: "required",
      cardname: "required",
      cardnumber: "required",
      cardexpire: "required",
      cardzip: "required"
    //    email: {
    //     required: true,
    //     // Specify that email should be validated
    //     // by the built-in "email" rule
    //     email: true
    //   },
    //   password: {
    //     required: true,
    //     minlength: 5
    //   }
    },
    // Specify validation error messages
    messages: {
        typeRadio: "Please enter card type",
        cardname: "Please enter name",
        cardnumber: "Please enter card number",
        cardexpire: "Please enter card expiration (MM/YY)",
        cardzip: "Please enter zip code"
    //   password: {
    //     required: "Please provide a password",
    //     minlength: "Your password must be at least 5 characters long"
    //   },
    //   email: "Please enter a valid email address"
    },
    // ,
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
        alert("doing somestuff");
    //   form.submit();
        return processPayment();
    }
  });
// });
