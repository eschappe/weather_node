
/*
 * GET home page.
 */

exports.index = function(req, res){
	var weather = require('../lib');
	weather.get_weather_info(function(data){
        var finnal = {};
        var better_time = {};
		for(var i in data.dwml.data){
            var time_layout = data.dwml.data[i]['time-layout'];


            for(var ii in time_layout){
                better_time[time_layout[ii]['layout-key']] = time_layout[ii];
            }

            var temp_data = data.dwml.data[i].parameters.temperature;
            for(var ii in temp_data){
                var temp = temp_data[ii];
                var time = better_time[temp['time-layout']];
                if(time){
                    for(var iii in time['start-valid-time']){
                        var _time = time['start-valid-time'][iii]["$t"];
                        var i_data = finnal[_time];
                        if(!i_data){
                            i_data = {}
                            i_data['period'] = time['start-valid-time'][iii]["period-name"];
                            i_data['time'] = time['start-valid-time'][iii]["$t"];
                        }


                        i_data[temp['type']] = temp['value'][iii];
                        finnal[_time] = i_data;
                    }

                }
            }
            var temp = data.dwml.data[i].parameters.weather;

                var time = better_time[temp['time-layout']];
                if(time){
                    for(var iii in time['start-valid-time']){
                        var _time = time['start-valid-time'][iii]["$t"];
                        var i_data = finnal[_time];
                        if(!i_data){
                            i_data = {}
                            i_data['period'] = time['start-valid-time'][iii]["period-name"];
                            i_data['time'] = time['start-valid-time'][iii]["$t"];
                        }
                        console.log(temp['weather-conditions'][iii]);

                        i_data['summary'] = temp['weather-conditions'][iii]['weather-summary'];
                        finnal[_time] = i_data;
                    }

                }else{
                    console.log(temp['time-layout']);
                    console.log(time);
                }
            
        }
		console.log(Object.keys(better_time));
		res.json(finnal);
	})
  //res.render('index', { title: 'Express' });
};