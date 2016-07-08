// -- Requires -- //
var tKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

// -- Twitter credentials -- //
var twitterConsumerKey = tKeys.twitterKeys.consumer_key;
var twitterConsumerSecret = tKeys.twitterKeys.consumer_secret;
var twitterAccessTokenKey = tKeys.twitterKeys.access_token_key;
var twitterAccessTokenSecret = tKeys.twitterKeys.access_token_secret;

// -- Program arguments -- //
var argValue = process.argv.splice(2, process.argv.length - 1);

// -- Create Twitter object -- //
var client = new Twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});

// -- Function to query Twitter -- //
function getTweet() {

  client.get('statuses/user_timeline', {screen_name: 'anandgk2014', count:20}, function(error, tweets, response){
    if (!error) {

      // For last 20 tweets display in console one at a time
      tweets.forEach(function (currTweet, index)  {
        console.log('@' + currTweet.user.screen_name + ' : ' + currTweet.created_at + ' : ' + currTweet.text);
      });

    }
  });
}

// -- Function to query Spotify -- //
function getSpotify(trackName) {

  // Use the default track name if not supplied as argument
  trackName = trackName == "" ? "what's my age again" : trackName;

  // Query Spotify for the track name
  spotify.search({ type: 'track', query: trackName }, function(err, data) {
    if ( !err ) {
      
      var artistsList = [];

      // For each album
      data.tracks.items.forEach(function (currAlbum, index)  {

        // For each artist
        currAlbum.artists.forEach( function (currArtist, index) {

          // Push into array for later display
          artistsList.push(currArtist.name);
        });

        // Display in console
        console.log('Artists : ' + artistsList.join(','));
        console.log('Preview URL : ' + currAlbum.preview_url);
        console.log('Album Name : ' + currAlbum.name);

        artistsList = [];
      });
    }
  });
}

// -- Function to read from file -- //
function  getDefaultFromFile() {

  // Read file
  fs.readFile("random.txt", "utf8", function(error, data) {

    // For each row in file, split and store in array
    var rowArray = data.toString().split("\n");

    // Read from array
    rowArray.forEach( function( reqColumn, index )  {

      // Perform split by "," for each value from array
      var dataArr = reqColumn.split(',');

      // Get the type of API query and switch to appropriate case statement
      switch(dataArr[0]) {

        case 'my-tweets':
          getTweet();
          break;

        case 'spotify-this-song':
          getSpotify(dataArr.splice(1, dataArr.length - 1).join(' '));
          break;
      }

    });
  });
}

// -- Main -- //

// Depending on the type of query argument switch to appropriate case statement
switch(argValue[0]) {
  
  case 'my-tweets':
    getTweet();
    break;

  case 'spotify-this-song':
    getSpotify(argValue.splice(1, argValue.length - 1).join(' '));
    break;

  case 'do-what-it-says':
    getDefaultFromFile();
    break;

}
