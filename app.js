var express = require('express');

//data proider (yslow)
var dataProvier = require('./modules/perf-yslow.js');

//perf database
var db = require('./modules/perf-db.js')();

var app = express();

/*
	Once called the dataprovider fetches data for the given url.
	The data is parsed and then stored using the database provider.
*/
app.get('/storePerformanceData', function(req, res) {
	if(req.query.url){
		var _dataProvier = dataProvier();
		var data = _dataProvier.getPerformanceDataForUrl(req.query.url);

		db.savePerformanceData(data, function(err){
			if(err) res.send("Failed to save data to mongo")
			res.send('Succesfully saved performance data for ' + req.query.url);
		});

	}
	else{
		res.send('Please provide a valid url');
	}
});

/*
	Call this url to get the performance data for a given website. 
	The database is queried and the results are returned.

	Query parameters:

	url=[http url] 			Application will request performance data for this given url
	startDate=[dd-mm-yyy]	Application will return data within a date range
	limit=[Number]			How many results that are returned
*/
app.get('/getPerformanceData', function(req, res) {
	if(req.query.url){
		var _dataProvier = dataProvier();
		var perfData = db.getPerformanceData({
			url: req.query.url,
			limit: req.query.limit,
			startDate: req.query.startDate,
			success:function(_data){
				if(_data.length > 0){
					res.send(_data);
				}
				else{
					res.send("No performance data has been saved for " + req.query.url);
				}
			},
			error:function(err){
				res.send("Failed to get data for url : " + err);
			}
		});
	}
	else{
		res.send('Please provide a valid url')
	}
		
});


app.listen(3000);