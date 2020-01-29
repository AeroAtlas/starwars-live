var qURL = "https://api.themoviedb.org/3"
var type = "movie" //or tv
var genre= "genre"//name or id of genre
var runtime=""; //15 minute increments
var sources=""; //netflix or similar. uses other api
var apiKey = "92f5c8ff853ffea4d1fed070c2f2d729"
var tries = 0;
var finalResult = "";
var descArray = [];
var srcArray = [];
var ytVid = "";
var ytVidID = "";


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
  genre = $("#genre").val().trim();
  console.log(genre);
  //Gets runtime variable
  runtime = $("#runtime").val().trim();
  console.log(runtime);
  //Splits runtime into first num and second num
  var r1 = runtime.indexOf("-");
  var r2 = runtime.indexOf(" ");
  //first num
  var r3 = runtime.substring(0,r1);
  //second num
  var r4 = runtime.substring(r1+1,r2);
  console.log(r3);
  console.log(r4);
  //Gets source variable
  source = $("#sources").val().trim();
  console.log(source);
  //Get id instead of name
  if(source == "Netflix"){
    console.log("netflix works")
    //Push name
    srcArray.push(source);
    //Push id
    source = 12;
    srcArray.push(source);
  } else if(source == "Hulu"){
    console.log("hulu works")
    srcArray.push(source);
    source = 10;
    srcArray.push(source);
  } else if(source == "Prime Video"){
    console.log("prime works")
    srcArray.push(source);
    source = 13;
    srcArray.push(source);
  } else if(source == "HBO"){
    console.log("hbo works")
    srcArray.push(source);
    source = 93;
    srcArray.push(source);
  }
  console.log(srcArray)

  //Exclude adult content
  var adult = "&include_adult=false";

  sources = $("#sources").val().trim();
  // var page; var randomPage;
  var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey+adult}&language=en-US&page=1`
  console.log(queryURL);

  function totalAjax(){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    var res = response;

    //Gets total number of pages
    var page = res.total_pages;
    console.log(page)

    //Randomizes Page Number
    var randomPage = Math.floor((Math.random() * page)+1);
    console.log(randomPage);

    //Updates QueryURL
    queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey}&language=en-US&page=${randomPage}`
    

    //Second Ajax
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      var res = response;
      console.log(res);
      console.log(res.total_results);

      //Gets Random Number
      var total = Math.floor((Math.random() * 20));
      console.log(total);

      //Gets the total results
      var outputArray = res.results;
      console.log(outputArray);

      //Get title/name if its tv or movie
      var outputName;
      if(type == "movie"){
        console.log("movie = title")
        outputName = outputArray[total].title;
        console.log(outputName);
      } else {
        console.log("tv = name")
        outputName = outputArray[total].name;
        console.log(outputName);
      }
        console.log(outputName);

      //Get rid of special characters
      function cleanUpSpecialChars(str){
        return str
          .replace(/[ÀÁÂÃÄÅÆ]/g,"A")
          .replace(/[àáâãäåæ]/g,"a")
          .replace(/[Ç]/g,"C")
          .replace(/[ç]/g,"c")
          .replace(/[ÈÉÊË]/g,"E")
          .replace(/[èéêë]/g,"e")
          .replace(/[ÌÍÎÏ]/g,"I")
          .replace(/[ìíîï]/g,"i")
          .replace(/[Ñ]/g,"N")
          .replace(/[ñ]/g,"n")
          .replace(/[ÒÓÔÕÖØ]/g,"O")
          .replace(/[òóôõöø]/g,"o")
          .replace(/[Š]/g,"S")
          .replace(/[š]/g,"s")
          .replace(/[ß]/g,"ss")
          .replace(/[ÚÛÜÙ]/g,"U")
          .replace(/[ùúûü]/g,"u")
          .replace(/[ÝŸ]/g,"Y")
          .replace(/[ýÿ]/g,"y")
          .replace(/[Ž]/g,"Z")
          .replace(/[ž]/g,"Z")
          .replace(/[^\x00-\x7F]+/g,'') //non ascii
          //.replace(/[^a-z0-9]/gi,''); // final clean up
      }
      cleanUpSpecialChars(outputName);

      //Replace spaces with -
      outputName = outputName.replace(/\ /g, '-')
      console.log(outputName)
      //SAVE NAME
      
      //Get Description for the Movie/Show
      console.log(queryURL);
      console.log(res.results[total].overview)
      var desc = res.results[total].overview
      descArray.push(desc);

      //Get poster
      var artwork = "https://image.tmdb.org/t/p/w500" + res.results[total].poster_path
      //SAVE ARTWORK
      var backdrop = "https://image.tmdb.org/t/p/w500" + res.results[total].backdrop_path

      //If null
      if(artwork == null && backdrop === null){
        artwork = "https://www.gaskinsbennett.com/wp-content/uploads/2017/06/placeholder-500x500.jpg"
        backdrop = "https://www.gaskinsbennett.com/wp-content/uploads/2017/06/placeholder-500x500.jpg"
      }
      
      
      console.log(artwork)

      //Youtube ID
      var ytID = res.results[total].id;
      console.log(ytID)
      console.log(typeof(ytID))
      if(ytID === null){
        //ytID = "157336"
        totalAjax();
      }

      var ytURL = `http://api.themoviedb.org/3/movie/${ytID}/videos?api_key=92f5c8ff853ffea4d1fed070c2f2d729`
      //var ytURL = `http://api.themoviedb.org/3/movie/157336/videos?api_key=92f5c8ff853ffea4d1fed070c2f2d729`
      console.log(ytURL);
      
      //Third AJAX
      $.ajax({
        url: ytURL,
        method: "GET"
      }).then(function(res2) {
        console.log(res2)
        if(res2.results.length === 0){
          //ytVidID = "2LqzF5WauAw"
          totalAjax();
        }
        ytVid = `https://www.youtube.com/watch?v=${res2.results[0].key}`
        //SAVE VIDEO LINK
        ytVidID = ""+res2.results[0].key;
        console.log(ytVid);


      console.log(ytVid)
      console.log(ytVidID)





      //OUTPUT CODE

      //Output the Title
      $("#outputs").text(outputName)

      //Output the Artwork
      var poster = $("<img>");
      poster.attr("src", artwork);
      poster.attr("alt", backdrop);
      poster.attr("id", "poster-image");
      poster.attr("class", "rounded float-left");
      $("#outputs").append(poster);

      //Output the Description
      var desc = $("<p>");
      desc.append(descArray[0]);
      console.log(descArray[0]);
      $("#outputs").append(desc);
      descArray = [];

      //Output the youtube video
      var trailer = $("<div>");
      trailer.attr("id", ytID);
      trailer.attr("class", "youtube")
      trailer.attr("style", "width:560px; height:315px");
      $("#inputs").append(trailer);

      //Get the element
      //var youtube = document.getElementsByClassName("youtube")

      // //Thumbnail
      // var trailerImg = $("<img>");
      // trailerImg.attr("src", `http://img.youtube.com/vi/${ytVidID}/maxresdefault.jpg`);
      // trailerImg.attr("class", "thumb");

      // //Play Icon
      // var circle = $("<div>");
      // circle.attr("class", "circle");

      // $(".youtube").append(trailerImg);
      // $(".youtube").append(circle);

      // function updateIframe(){
      //   var myFrame = $("#myframe").contents().find('body');
      //   var imgValue = $("img").val();
      //   myFrame.html(imgValue);
      // }

      //var ytIframe = $("<iframe>");
      //<iframe width="893" height="502" src="https://www.youtube.com/embed/ORyR_NcGAO8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      //ytIframe.attr("src", `https://www.youtube.com/embed/${ytID}?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1`);
      $("#yt").attr("src", `https://www.youtube.com/embed/${ytVidID}`);
      $("#yt").attr("width", "400");
      $("#yt").attr("height", "300");
      // ytIframe.attr("frameborder", "0");
      // ytIframe.attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
      //ytIframe.attr("allowfullscreen")
      //ytIframe.attr("style", "width:560px; height:315px; margin-top: 30px");
      //ytIframe.attr("style", `width: ${$(".youtube").attr(width)}; height:${$(".youtube").attr(height)}`);
      //$(".youtube").append(ytIframe);
      //$("#inputs").append(ytIframe);


      // Confetti
      var confettiSettings = { "target": 'my-canvas', 'rotate': true,"max":"80","size":"1","animate":true,"props":["circle","square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"25","rotate":false,"width":"958","height":"923"};
      var confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      setTimeout(function(){confetti.clear()}, 5000);

      });
    });
  });
  } //end of function
  totalAjax();
})