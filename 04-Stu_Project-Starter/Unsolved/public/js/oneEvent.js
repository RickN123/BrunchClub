
var API = {
    deleteEvent: function(id) {
      return $.ajax({
        url: "/api/events/" + id,
        type: "DELETE",
        success: function(data, textStatus) {

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        }
      });
    },
    registerUser: function(details){
      return $.ajax({
        url: "/api/register", 
        type:"POST",
        data: details,
        success: function(response){
          console.log(response)
        }
      })
    }
};

$(".delete").click(function() {
    console.log(this);

    var idToDelete = $(this).attr("data-id");

    console.log(idToDelete);

  API.deleteEvent(idToDelete).then(function() {
    console.log("Event Deleted");
  });
});


$(".register-user").click(function(event) {
  event.preventDefault();
  var eventsDetails={
    name:$("#validationRegister-name").val().trim(),
    email:$("#validationRegister-email").val().trim(),
    EventId:$(this).attr("data-id")
  }
 
  API.registerUser(eventsDetails).then(function() {
    window.location.href = "/events/" + eventsDetails.EventId
  });

  $("#exampleModal").modal("hide")
  if (!(eventsDetails.name && eventsDetails.email)){
    alert("You must enter your name and email to register")
  }
});