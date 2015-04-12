var https = require('https');
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var keys = require("./api-keys");

var apiKey = keys.getKey("maps");

/**
 * An EventEmitter to get a zipcode's Latitude and Longtitude.
 * @param username
 * @constructor
 */

/**
 * Borrowed heavily from Treehouse (www.teamtreehouse.com) while I learn the JavaScripts
 */

function LatLng(zipcode){
	EventEmitter.call(this);

  latLngEmitter = this;

	var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipcode + "&key=" + apiKey, function(response){
		var body = "";

		if(response.statusCode !== 200) {
			request.abort();
			latLngEmitter.emit("error", new Error("There was an error getting the latitude and longtitude for this zipcode."));
		}

		// Read the data
		response.on('data', function(chunk){
			body += chunk;
			latLngEmitter.emit('data', chunk);
		});

		response.on('end', function(){
			if(response.statusCode === 200) {
				try {
					var locationData = JSON.parse(body);
					latLngEmitter.emit("end", locationData);
				} catch (error) {
					latLngEmitter.emit("error", error);
				}
			}
		}).on("error", function(error){
			latLngEmitter.emit("error", error)
		});	
	});
}

util.inherits( LatLng, EventEmitter );

module.exports = LatLng;

