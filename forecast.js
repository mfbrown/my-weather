var https = require('https');
var keys = require("./api-keys");

var apiKey = keys.getKey("forecast");;


function getWeather(lat, lng, city){
	https.get("https://api.forecast.io/forecast/" + apiKey + "/" + lat + "," + lng, function(response){
		if(response.statusCode === 200){
			var body = '';
			response.on('data', function (chunk) {
				body += chunk;
			});
			response.on('end', function(){
				var weatherData = JSON.parse(body);
				// TODO: Move this output to app.js so we can also list the current city
				var weatherSummary = weatherData.currently.summary;
				var temp = Math.floor(weatherData.currently.temperature);
				console.log("It is currently " + weatherSummary + " with temps at " + temp + " in " + city + ".");
			})
		} else {
			printError(response.statusCode);
		}
	})
}

module.exports.getWeather = getWeather;