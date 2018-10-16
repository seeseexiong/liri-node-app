var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "9ed78ca16115470d9824df388eb36ec3",
  secret: "fe7c6beb516c4ddca69d50af9523ea06"
});

var songTitle = process.argv[2];
 
spotify.search({ type: 'track', query: songTitle }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

var tracks = 0;
  for (var i=0; i<1; i++){
    //console.log(data.tracks.items[0]); 
    //print the followings: artist(s), song title, preview link, album

    var artist = data.tracks.items[i].artists[i].name;
    console.log( "Artist: " + artist )

    console.log( "Song Title: " + songTitle )

    var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;
    console.log( "Preview URL Link: " + previewLink )

    var album = data.tracks.items[0].album[0];
    console.log( "Album: " + album )

  }

});


  