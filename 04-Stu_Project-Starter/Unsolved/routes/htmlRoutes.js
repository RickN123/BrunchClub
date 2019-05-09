
var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(results) {
      res.render("index", {
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
