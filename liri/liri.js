require('dotenv').config()
//Step 7.) At the top of the liri.js file, add code to read and set 
//any environment variables with the dotenv package:

var keys = require("./keys.js");

var searchTerm = process.argv[3];

var userInput  = process.argv[2];
  if (userInput === "concert-this"){
    //Read the bands.js file.  Set it to "utf8" parameter.
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("/bands/bands.js", "utf8", function(error, data) {
    
    // If the code experiences any errors it will log the error to the console.
    if (error) {
    return console.log(error);
    }
    // We will then print the contents of data
    console.log(data);
    }
  )}
  else if (userInput === "spotify-this-song"){

  }
  else if (userInput === "movie-this"){

  }
  else if (userInput === "do-what-it-says"){

  }

  

  

  