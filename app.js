var LatLng = require('./geocode');
var forecast = require('./forecast')
var zipcode = process.argv.slice(2);

var locationData = new LatLng(zipcode);

locationData.on("end", function(locationJSON){
	var lat = locationJSON.results[0].geometry.location.lat;
	var lng = locationJSON.results[0].geometry.location.lng;
	var city = locationJSON.results[0].formatted_address;
	forecast.getWeather(lat, lng, city);
});