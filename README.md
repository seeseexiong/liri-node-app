# LIRI Node App
LIRI is like iPhone's SIRI. LIRI stands for _Language Interpretation and Recognition Interface_. 
This LIRI app will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
LIRI is a command line node app that takes in your **search term** and gives back information regarding **songs** , **concert**, or **movies**.

### Prerequisites
You will need to have Node JS installed to use this app.

## Getting Started
To get started, clone the app onto your computer. After you successfully cloned the app, open terminal and navigate to the correct folder destination. In this case, it will be the `liri.js` file.

1. To search for concents information, enter this command on your terminal or command line: <br/>
 `node liri.js concert-this "artist/band name here"` . <br/>
![](images/concertInfo.JPG) <br/><br/>

2. To search for songs and it's information, enter this command on your terminal or command line: <br/>
`node liri.js spotify-this-song "song name here"` . <br/>
![](images/songsInfo.JPG) <br/><br/>

3. To search for movies, enter this command on your terminal or command line: <br/>
`node liri.js movie-this "movie name here"` . <br/>
![](images/movieInfo.JPG) <br/><br/><br/>

## API Used
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)
* [Bands in Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [OMDB API](http://www.omdbapi.com/)

## Built With
* Node JS 

## Authors
* See Xiong - _initial work_ - [seeseexiong]( https://github.com/seeseexiong)

## License
This project is licensed under Trilogy/University of Minnesota
