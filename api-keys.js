// put API Keys in a separate file.

function getKey(api){
	var mapsKey = ""; //your google maps api key here
	var forecastKey = ""; //your forecast.io api key here
	if(api === "maps") {
		return mapsKey;
	}
	if(api === "forecast" ){
		return forecastKey;
	} else {
		console.log("Please choose either 'maps' or 'forecast' as api paramater");
	}
}


module.exports.getKey = getKey;