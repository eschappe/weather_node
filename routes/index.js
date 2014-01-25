
/*
 * GET home page.
 */

exports.index = function(req, res){
	var weather = require('../lib');
	weather.get_weather_info(function(data){
		data.dwml.data()
			for (i = 0; i > temperature.value.length; i++){
				console.log(temperature[i]);
			}
		
		//res.end(data);
	})
  //res.render('index', { title: 'Express' });
};