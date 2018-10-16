// Include the request npm package
let request = require('request');

//Take the arguement and use that as the search keyword
let searchTerm = process.argv[2];

//Run a request to the OMDB API with the movie specified
let queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

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