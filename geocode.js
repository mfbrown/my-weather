var http = require('https');

var apiKey = "AIzaSyCpJzPRDbFCee5AX-cgZT41A-2u36J04mg";

//Print out Error Messages
function printError(error){
  console.error(error.message);
};

function getLatLng(zipcode){
	http.get("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipcode + "&key=" + apiKey, function(response){
		if(response.statusCode === 200){
			var body = '';
			response.on('data', function (chunk) {
				body += chunk;
			});
			response.on('end', function(){
				console.log(response.statusCode);
				var locationData = JSON.parse(body);
				var lat = locationData.results[0].geometry.location.lat;
				var lng = locationData.results[0].geometry.location.lng;
				console.log("Lat: " + lat);
				console.log("Lng: " + lng);
			})
		} else {
			printError({message: "There was an error getting the location for " + zipcode + ". (" + response.STATUS_CODES[response.statusCode] + ")." });
		}
	})
}

module.exports.getLatLng = getLatLng;