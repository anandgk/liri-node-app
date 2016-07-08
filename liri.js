var tKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var twitterConsumerKey = tKeys.twitterKeys.consumer_key;
var twitterConsumerSecret = tKeys.twitterKeys.consumer_secret;
var twitterAccessTokenKey = tKeys.twitterKeys.access_token_key;
var twitterAccessTokenSecret = tKeys.twitterKeys.access_token_secret;
var argValue = process.argv.splice(2, process.argv.length - 1);
var client = new Twitter({
  consumer_key: twitterConsumerKey,
  consumer_secret: twitterConsumerSecret,
  access_token_key: twitterAccessTokenKey,
  access_token_secret: twitterAccessTokenSecret
});

function getTweet() {
  client.get('statuses/user_timeline', {screen_name: 'anandgk2014', count:20}, function(error, tweets, response){
    if (!error) {

      tweets.forEach(function (currTweet, index)  {
        console.log('@' + currTweet.user.screen_name + ' : ' + currTweet.created_at + ' : ' + currTweet.text);
      });

    }
  });
}

function getSpotify(trackName) {

  trackName = trackName == "" ? "what's my age again" : trackName;

  spotify.search({ type: 'track', query: trackName }, function(err, data) {
    if ( !err ) {
      
      var artistsList = [];

      data.tracks.items.forEach(function (currAlbum, index)  {
        currAlbum.artists.forEach( function (currArtist, index) {
          artistsList.push(currArtist.name);
        });

        console.log('Artists : ' + artistsList.join(','));
        console.log('Preview URL : ' + currAlbum.preview_url);
        console.log('Album Name : ' + currAlbum.name);

        artistsList = [];
      });
    }
  });
}

function  defaultFromFile() {
  
}

switch(argValue[0]) {
  
  case 'my-tweets':
    getTweet();
    break;

  case 'spotify-this-song':
    getSpotify(argValue.splice(1, argValue.length - 1).join(' '));
    break;


}




