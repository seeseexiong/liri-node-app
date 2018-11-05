require('dotenv').config()
//Step 7.) At the top of the liri.js file, add code to read and set 
//any environment variables with the dotenv package:
var moment = require('moment');

var keys = require("./keys.js");

var searchTerm = process.argv.splice(3).join(" ");
 console.log(searchTerm);
var request = require('request');

var commandInput  = process.argv[2];
  if (commandInput === "concert-this"){
    concert();
  }

  else if (commandInput === "spotify-this-song"){
    spotify();
  }

  else if (commandInput === "movie-this") {
    movie();
  }
  else {
      console.log("Command not found")
  };

  function spotify(){
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
      id: "9ed78ca16115470d9824df388eb36ec3",
      secret: "fe7c6beb516c4ddca69d50af9523ea06"
    });

    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    var tracks = 0;
      for (var i=0; i<1; i++){
        //console.log(data.tracks.items[0]); 
        //print the followings: artist(s), song title, preview link, album
        
        var artist = data.tracks.items[i].artists[i].name;
        console.log( "Artist: " + artist )
      
        console.log( "Song Title: " + searchTerm )
      
        var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;
        console.log( "Preview URL Link: " + previewLink )
      
        var album = data.tracks.items[0].album[0];
        console.log( "Album: " + album )
      
      }
    });
  }

  function movie(){
     //Run a request to the OMDB API with the movie specified
     var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

     //Debug against the actual URL.
     console.log(queryUrl);
 
 
     // Create a request to the queryUrl
     request(queryUrl, function(error, response, body) {
         if (error) console.log('error:', error); //print the error if one occurred
     
         console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
       let JSONResponse = JSON.parse(body);
       //console.log(JSONResponse)
     
       // Print the following information
       // Movie Title
       console.log('Title:', JSONResponse.Title);
       //Year movie came out
       console.log('Year the movie came out:', JSONResponse.Year);
       //IMDB Rating
       console.log('IMDB Rating:', JSONResponse.imdbRating);
       //Rotten tomatoes rating
       console.log('Rotten tomatoes rating:', JSONResponse.Ratings.Source);
       //Country the movie was produced
       console.log('Country the movie was produced:', JSONResponse.Country);
       //Language of the movie
       console.log('Language:', JSONResponse.Language);
       //Plot
       console.log('Plot:', JSONResponse.Plot);
       //Actors
       console.log('Actors:', JSONResponse.Actors);
     });
  }

  function concert(){
     //Run a request to the bandsintown API with the artist specified
     var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
     console.log(queryUrl);

     // Create a request to the queryUrl
     request(queryUrl, function(error, response, body) {
       if (error) console.log('error:', error); //print the error if one occurred
         console.log('statusCode:', response.statusCode); // Print the response status code if a response was received

         let JSONResponse = JSON.parse(body);

         var band = 0;

           for (var i=0; i<1; i++) {
           
           //console.log(JSONResponse[0].venue.name)

           //print the following information
           //Name of the venue
           console.log("==============================")
           console.log("Venue: " + JSONResponse[0].venue.name)
           
           //Venue location
           console.log("Location: " + JSONResponse[0].venue.city + ", " + JSONResponse[0].venue.country)

           //Date of the event, MM/DD/YYYY
           var randomDate = JSONResponse[0].datetime;
           var randomFormat = "YYYY-MM-DDThh:mm:ss";
           var convertedDate = moment(randomDate, randomFormat);
           console.log("Date: " + convertedDate.format("MM/DD/YY hh:mm"))
       }
   })
  }