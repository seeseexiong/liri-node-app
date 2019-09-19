//require npm modules from npmjs.com
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');
require("dotenv").config();
var fs = require('fs');


//import the external keys.js file
const keys = require('./keys')

let command = process.argv[2]
// Get all elements in process.argv, starting from index 3 to the end
// Join them into a string to get the space delimited address
let searchTerm = process.argv.slice(3).join(" ")

//liri will take the following commands:
// `concert-this`, `spotify-this-song`, `movie-this`, `do-what-it-says`

if (command === "concert-this") {
    searchBandsInTown();
}
else if (command === "spotify-this-song") {
    searchSpotify();
}
else if (command === "movie-this") {
    searchMovie();
}
else if (command === "do-what-it-says") {
    doWhatItSays()
}
else {
    console.log("Command not found")
};



function searchBandsInTown() {
    // If no artist or band is provide, console.log a comment to let user to enter an artist or band's name
    if (searchTerm === '') {
        console.log("After 'concert-this' key word, enter an artist or band's name")
    }
    // Search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    // At this time the Bandsintown API only allows artists and anyone working on their behalf to access, use, and display artist and 
    // event data on their website or app.Use Trilogy's id for now (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=clientID"`)
    else {
        let queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"



        // Create a request to the queryURL
        request(queryURL, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.

            //JSON.parse the body to make it accessible 
            let JSONResponse = JSON.parse(body)

            // For each of the concert, we want to console.log the name of the venue, city and country, and date (use moment to format this as "MM/DD/YYYY")
            JSONResponse.forEach(function (concert) {
                console.log("VENUE    - " + concert.venue.name)
                console.log("LOCATION - " + concert.venue.city + ", " + concert.venue.country)
                console.log("DATE     - " + moment(concert.datetime).format('L'))
                console.log("================================================")
            })
        });
    }

}

function searchSpotify() {
    //   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
    //   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
    //   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
    //   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    //   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    //   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

    // Use spotify id and secret imported from key.js above
    var spotify = new Spotify(
        keys.spotify
    );

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (searchTerm === '') {
        searchTerm = 'The Sign Ace of Base'
        spotify.search({ type: 'track OR artist', query: searchTerm, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('You must enter a song title. Here is a default song for you.')
            }
        })
    }

    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data); // the useful data are nested inside tracks and inside items
        let eachAlbum = data.tracks.items
        // console.log(eachAlbum)

        //console.log(eachAlbum[0].album.artists)// to see the nested artists names

        eachAlbum.forEach(function (track) {
            //     * Artist(s)
            console.log("ARTIST(S)    - " + track.artists[0].name)
            //     * The song's name
            console.log("SONG TITLE   - " + track.name)
            //     * A preview link of the song from Spotify
            console.log("PREVIEW LINK - " + track.external_urls.spotify)
            //     * The album that the song is from
            console.log("ALBUM        - " + track.album.name)
            console.log("================================================")
        })
    });
}

function searchMovie() {
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (searchTerm === '') {
        searchTerm = 'Mr. Nobody'
        console.log("If you haven't watched \"Mr. Nobody,\" then you should: <http://www.imdb.com/title/tt0485947/>")
        console.log("It's on Netflix!")
    }

    // Use the request package to retrieve data from the OMDB API.
    let apiKey = "trilogy"
    let queryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + apiKey // Omdb api key retrieved from http://www.omdbapi.com/

    request(queryURL, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        // JSON parse the body to make it accessible
        let JSONResponse = JSON.parse(body)

        // * Title of the movie.
        console.log('TITLE                  - ' + JSONResponse.Title)
        // * Year the movie came out.
        console.log('YEAR                   - ' + JSONResponse.Year)
        // * IMDB Rating of the movie.
        console.log('IMDB RATING            - ' + JSONResponse.imdbRating)
        // * Rotten Tomatoes Rating of the movie.
        console.log('Rotton Tomatoes RATING - ' + JSONResponse.Ratings[0].Source)
        // * Country where the movie was produced.
        console.log('COUNTRY OF PRODUCTION  - ' + JSONResponse.Country)
        // * Language of the movie.
        console.log('LANGUAGE               - ' + JSONResponse.Language)
        // * Plot of the movie.
        console.log('PLOT                   - ' + JSONResponse.Plot)
        // * Actors in the movie.
        console.log('ACTORS                 - ' + JSONResponse.Actors)
        console.log("================================================")
    });
}

function doWhatItSays() {
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        console.log(data)
    })
}