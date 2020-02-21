var path = require("path");
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/landingPage.html"));
  });
  app.get("/queryresults", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/resultsPage.html"));
  });
  //NO RESULTS FOUND PAGE NEEDED!
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
