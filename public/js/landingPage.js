function populur() {
  var queryurl1 =
    "https://api.themoviedb.org/3/tv/popular?api_key=0df7e9832c7f3dbefb03f430a97b5c7a&language=en-US&page=1";
  $.ajax({
    type: "GET",
    url: queryurl1
  }).then(function(responce) {
    console.log(responce);
    for (var i = 0; i < responce.results.length; i++) {
      console.log(responce.results[i].poster_path);
      var images = responce.results[i].poster_path;
      console.log("<img  src='https://image.tmdb.org/t/p/w50" + images + "' >");
      $("#popular").append(
        "<img class='homeimg'src='https://image.tmdb.org/t/p/w500" +
          images +
          "' >"
      );
    }
  });
}
populur();

function query(event) {
  event.preventDefault();
  var val = $(".form-control-lg").val();
  console.log(val);
  var show = val.replace(/ /g, "+");
  console.log(show);
  localStorage.setItem("query", show);
  $.ajax({
    type: "GET",
    url: `/queryresults`
  }).then(function(res) {
    console.log(res);
  });
}
