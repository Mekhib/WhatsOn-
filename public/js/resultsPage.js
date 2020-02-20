$(document).ready(function() {
  var data = localStorage.getItem("query");
  console.log(data);
  $.ajax({
    type: "GET",
    url: `/query/${data}`
  }).then(res => {
    var id = res[0].show.externals.imdb;
    console.log(id);
    console.log(res);
    $(".jumbotron-background").css({
      "background-image": `url(${res[0].show.image.medium})`
    });
    $("#title").text(res[0].show.name);
    $("#info").html(res[0].show.summary);
    $("#genre").html(res[0].show.genres[0]);
    var stars = Math.floor(res[0].show.rating.average);
    console.log(stars);
    for (var i = 0; i < stars; i++) {
      console.log("loop");
      var html =
        "<img src='https://img.icons8.com/emoji/48/000000/star-emoji.png'></img>";
      $("#align").append(html);
    }
    $("#count").html(`${stars} out of 10`);
    getID();
  });
  getID = () => {
    var string = data.replace("+", "%20");
    console.log(string);
    var apiKey = "0df7e9832c7f3dbefb03f430a97b5c7a";
    $.ajax({
      type: "GET",
      url: `https://api.themoviedb.org/3/search/tv?query=${string}&api_key=${apiKey}&language=en-US&page=1`
    }).then(res => {
      showData(res.results[0].id);
    });
  };
  showData = id => {
    var apiKey = "0df7e9832c7f3dbefb03f430a97b5c7a";
    $.ajax({
      type: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
    }).then(res => {
      console.log(res);
    });
  };
});
