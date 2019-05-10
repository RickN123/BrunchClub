
var db = require("../models");

module.exports = function(app) {
  //Load index page
  app.get("/events", function(req, res) {
    db.Event.findAll({}).then(function(results) {
      res.render("events", {
        msg: "Welcome!",
        Event: results
      });
    });
  });

  // Load event page and pass in an event by id
  app.get("/events/", function(req, res) {
    db.Event.findAll({}).then(function(results) {
      res.render("events", {
        Event: results
      });
    });
  });

  app.get("/events/:id", function(req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.render("oneEvent", {
      Event: results
      });
    });
  });

  app.get("/events/add", function(req, res) {
    console.log("Add an Event");
    
        // }).then(function(results) {
      res.render("add", {
        msg: "ADDDDDAKJFKLJDFLK"

      });
    });
  
  

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
}
