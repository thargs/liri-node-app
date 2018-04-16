var keys = require("./keys.js");

var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);
var input = process.argv;
var action = input[2];
var inputs = input[3];

switch (action) {
	case "my-tweets":
	twitter(inputs);
	break;

	case "spotify-this-song":
	spotify(inputs);
	break;

	case "movie-this":
	movie(inputs);
	break;

};
//////////////////////////////////////////////////////////////////////////////////////////
//Twitter
function twitter(inputs) {
	var params = {screen_name: inputs, count: 20};
	
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				for (i = 0; i < tweets.length; i ++){
					console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
				}
			} else {
				console.log(error);
			}
		});

}
//////////////////////////////////////////////////////////////////////////////////////////
//Spotify
function spotify(inputs) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}

//////////////////////////////////////////////////////////////////////////////////////////
//OMDB

//https://www.npmjs.com/package/liri-cli   this looks easier...
//https://www.npmjs.com/package/omdb-client    this may work...

function movie(inputs) {
	console.log(inputs);
    var queryURL = "http://www.omdbapi.com/?i=" + inputs + "tt3896198&apikey=d18e3900";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

