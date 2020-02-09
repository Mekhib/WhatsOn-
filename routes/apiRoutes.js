var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/query/:show", function(req, res) {
    var show = req.params.show;
    axios
      .get(`http://api.tvmaze.com/search/shows?q=${show}`)
      .then(response => res.json(response.data));
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
