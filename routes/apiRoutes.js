var axios = require("axios");

module.exports = function(app) {
  app.get("/query/:show", function(req, res) {
    var show = req.params.show;
    axios
      .get(`http://api.tvmaze.com/search/shows?q=${show}`)
      .then(response => res.json(response.data));
  });
};
