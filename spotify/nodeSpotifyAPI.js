let Spotify = require('node-spotify-api');
 
let spotify = new Spotify({
  id: "9ed78ca16115470d9824df388eb36ec3",
  secret: "fe7c6beb516c4ddca69d50af9523ea06"
});

let song = process.argv[2];

spotify
  .request('https://api.spotify.com/'+ song)
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
    //let JSONResponse = JSON.parse(data);
    //console.log(JSONResponse); 
  });

