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
    $("#count").html(`${stars} out of 10 stars`);
    var time = moment(res[0].show.schedule.time, "HH:mm:ss").format(
      "h:mm:ss A"
    );
    console.log(time);
    $("#timeslot").text(`${time} on ${res[0].show.schedule.days[0]}s!`);
    $("#network").text(`only on ${res[0].show.network.name}`);
    var listItem1 = `<li>Runtime : ${res[0].show.runtime} minutes</li>`;
    var listItem2 = `<li>Type : ${res[0].show.type}</li>`;
    var listItem3 = `<li>Language: ${res[0].show.language}</li>`;
    var listItem4 = `<li>API ID: ${res[0].show.id}</li>`;
    $("#list").append(listItem1);
    $("#list").append(listItem2);
    $("#list").append(listItem3);
    $("#list").append(listItem4);
    $("#siteimg").attr("src", res[0].show.image.medium);
    $("#site").text(res[0].show.url);
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
      $("#debut").append(res.first_air_date);
      $("#seasons").text(`${res.number_of_seasons} seasons`);
      $("#episodes").text(`${res.number_of_episodes} episodes`);
      $("#sumimg").attr(
        "src",
        `https://image.tmdb.org/t/p/original${res.backdrop_path}`
      );
      $("#summary").text(res.overview);
      $("#epiimg").attr(
        "src",
        `https://image.tmdb.org/t/p/original${res.last_episode_to_air.still_path}`
      );
      $("#episode").text(res.last_episode_to_air.name);
      $("#episodeDescription").text(res.last_episode_to_air.overview);
      $("#footer").text(
        `orignal air date: ${res.last_episode_to_air.air_date}`
      );
      $("#proimg").attr(
        "src",
        res.production_companies[0].logo_path
          ? `https://image.tmdb.org/t/p/original${res.production_companies[0].logo_path}`
          : `https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
      );
      $("#proinfo").text(res.production_companies[0].name);
      $("#creatorimg").attr(
        "src",
        `https://image.tmdb.org/t/p/original${res.created_by[0].profile_path}`
      );
      $("#creatorinfo").text(res.created_by[0].name);
    });
  };
});
