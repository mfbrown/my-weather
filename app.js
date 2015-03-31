var geocode = require('./geocode');
var zipcode = process.argv.slice(2);

zipcode.forEach(geocode.getLatLng);