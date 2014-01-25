module.exports = {
	get_weather_info: function(callback){


		var request = require('request');
		request('http://forecast.weather.gov/MapClick.php?lat=43.07980&lon=-89.3875&unit=0&lg=english&FcstType=dwml', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body) // Print the google web page.
		    var parser = require('xml2json');

			var json = parser.toJson(body); //returns a string containing the JSON structure by default
			return callback(json);
		  }
		})
	}
}