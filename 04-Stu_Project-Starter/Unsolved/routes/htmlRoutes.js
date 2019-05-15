
var db = require("../models");

module.exports = function(app) {

//===============================
//Load ALL Events Page
  app.get("/events/", function(req, res) {
    db.Event.findAll({}).then(function(results) {
      res.render("events", {
        Event: results
      });
    });
  });

  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(results) {
      res.render("events", {
        Event: results
      });
    });
  });

//===============================
//Load One Event by ID
  app.get("/events/:id", function(req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      db.Register.findAll({
        where:{
          EventId: req.params.id
        }
      }).then(function(participants){
        res.render("oneEvent", {
          Event: results,
          Register: participants
          });
          
      })
      // res.render("oneEvent", {
      // Event: results
      // });
    });
  });

//===============================
//Add New Event
  app.get("/newevent", function(req,res) {
    db.Event.findAll({
      limit: 3
    }).then(function(results) {
      res.render("add", {
        Event: results
      });
  });
});

//===============================
// Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
}
