var gURL = "https://rawg-video-games-database.p.rapidapi.com"
var apiKey = "92f5c8ff853ffea4d1fed070c2f2d729"
var type = "";
// var genre = "";
// var console = "";
var single = 31;
var coop = 18;
var multi = 7;


//Click Event
$(".form-check-input").on("click", function(event){
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "true");
});

//Submitting the data
$("#submit").on("click", function(event){
  event.preventDefault();
  console.log("this works");

  //Undo Disable and Checked for type
  $(".form-check-input").prop('disabled', false)
  $(".form-check-input").prop('checked', false)

  //Gets genre variable
  var genre = $("#genre").val().trim();
  console.log(genre);
  var platforms = $("#platforms").val().trim();
  console.log(platforms);
  var publishers = $("#publishers").val().trim();
  console.log(publishers);

  //Settings for Ajax
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${gURL}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": "91e8d6d8f0msh25ec06cf2a849c7p124390jsn08de1e0ef7e7"
    }
  }
  
  function findGame(){
    //Ajax for Genre
    if(publishers == 0){
      settings.url = `${gURL}/games?genres=${genre}&platforms=${platforms}`
    } else {
      settings.url = `${gURL}/games?genres=${genre}&platforms=${platforms}&publishers=${publishers}`
    }

    //Add tags based on type (nothing by default)
    if(type === 31){
      settings.url += `&tags=singleplayer`
    } else if(type === 18){
      settings.url += `&tags=coop`
    } else if (type === 7){
      settings.url += `&tags=multiplayer`
    }


    //settings.url = `${gURL}/games?genres=7&platforms=11&publishers=3408`
    //settings.url = `${gURL}/games?genres=4&platforms=4&tags=coop`
    $.ajax(settings).done(function (response) {
      console.log(response);
      //If no results
      if(response.count === 0){
        //Show there is nothing
      }

      //Get random Page Number
      var random = Math.floor((Math.random() * Math.ceil(response.count/20))+1);
      //Doesn't go above 500
      if(random > 500){
        random = Math.floor((Math.random() * 500)+1);
      }
      console.log(random)

      //Add page number to URL
      settings.url += `&page=${random}`

      //Second AJAX
      $.ajax(settings).done(function(res) {
      console.log(res);
      //Get random result Number
      var ran = Math.floor((Math.random() * res.results.length));
      console.log(ran);
      var game = res.results[ran];
      console.log(game);


      //OUTPUT
      //Output the Title
      $("#outputs").text(game.name)

      //Output the Artwork
      var poster = $("<img>");
      poster.attr("src", game.background_image);
      poster.attr("id", "poster-image");
      poster.attr("class", "rounded float-left");
      poster.attr("style", "width:560px; height:315px");
      $("#outputs").append(poster);




      //Third API for YouTube video
      settings.url = `${gURL}/games/${game.slug}`
      $.ajax(settings).done(function (res2) {
        console.log(res2);

        // Output the Description
        var desc = $("<p>");
        desc.append(res2.description);
        console.log(res2.description);
        $("#outputs").append(desc);

        
        settings.url = `${gURL}/games/${game.slug}/movies`
        $.ajax(settings).done(function (res3) {
        console.log(res3);
        //var ytID = res3.results[0].name;
        var ytID = res3.results[0].data.max;
        console.log(ytID)
        //Output the youtube video
        var trailer = $("<div>");
        trailer.attr("id", ytID);
        trailer.attr("class", "youtube");
        trailer.attr("style", "width:560px; height:315px");
        $("#inputs").append(trailer);
        });




      });












      });//End of Second Ajax
    });//End of First Ajax
  }
  findGame()

//End of submit event
});