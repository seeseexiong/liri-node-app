// Include the request npm package
var request = require('request');

//Take the arguement and use that as the search keyword
var searchTerm = process.argv[2];

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
    //var randomDate = JSONResponse[0].datetime;
    //var randomFormat = "YYYY/MM/DDThh:mm:ss";
    //var convertedDate = moment(randomDate, randomFormat);
    //console.log("Date: " + convertedDate.format("MM/DD/YY hh:mm"))
    //console.log("Date: " + moment((JSONResponse[0].datetime),"MM/DD/YY hh:mm"))
    console.log("Date: " + JSONResponse[0].datetime)
    }
});