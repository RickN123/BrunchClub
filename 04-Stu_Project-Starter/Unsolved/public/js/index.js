// Get references to page elements
var $eventVenue = $("#event-venue");
var $eventTheme = $("#event-theme");
var $eventDateTime = $("#event-date-time");
var $eventSpecials = $("#event-specials");
var $eventAddress = $("#event-address");
var $eventNeighborhood = $("#event-neighborhood");
var $eventFoodType = $("#event-food-type");
var $submitBtn = $("#submit");
var $eventList = $("#event-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/events",
      data: JSON.stringify(event)
    });
  },
  getEvents: function() {
    return $.ajax({
      url: "api/events",
      type: "GET"
    });
  },
  deleteEvent: function(id) {
    return $.ajax({
      url: "api/events/" + id,
      type: "DELETE"
    });
  }
};

// refreshEvents gets new examples from the db and repopulates the list
var refreshEvents = function() {
  API.getEvents().then(function(data) {
    var $events = data.map(function(event) {
      var $a = $("<a>")
        .text(event.text)
        .attr("href", "events" + event.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": event.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

// handleFormSubmit is called whenever we submit a new event
// Save the new event to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var event = {
    venue: $eventVenue.val().trim(),
    theme: $eventTheme.val().trim(),
    date: $eventDateTime.val().trim(),
    specials: $eventSpecials.val().trim(),
    address: $eventAddress.val().trim(),
    neighborhood: $eventNeighborhood.val().trim(),
    food_type: $eventFoodType.val().trim(),
  };
  console.log(event);

  if (!(event.venue && event.theme)) {
    alert("You must enter an event text and description!");
    return;
  }

  API.saveEvent(event).then(function() {
    refreshEvents();
  });

  $eventVenue.val("");
  $eventTheme.val("");
  $eventDateTime.val("");
  $eventSpecials.val("");
  $eventAddress.val("");
  $eventNeighborhood.val("");
  $eventFoodType.val("");
  $eventList.val("");
  
};

// handleDeleteBtnClick is called when an event's delete button is clicked
// Remove the event from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteEvent(idToDelete).then(function() {
    refreshEvents();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$eventList.on("click", ".delete", handleDeleteBtnClick);
