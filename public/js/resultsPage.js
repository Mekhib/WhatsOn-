$(document).ready(function() {
  var data = localStorage.getItem("query");
  console.log(data);
  $.ajax({
    type: "GET",
    url: `/query/${data}`
  }).then(res => {
    console.log(res);
    $(".jumbotron").css({
      "background-image": `url(${res[0].show.image.medium})`
    });
  });
});
