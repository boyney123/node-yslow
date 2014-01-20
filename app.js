var express = require('express');
var data = require('./modules/perf-yslow.js');


 
var app = express();

 
app.get('/storePerformance', function(req, res) {
	if(req.query.url){
		var dataProvier = data();
		dataProvier.saveDataForUrl(req.query.url);
		res.send('Succesfully saved performance data for ' + req.query.url);
	}
	else{
		res.send('Please provide a valid url');
	}
});

app.get('/performance', function(req, res) {
		var dataProvier = data();
		var perfData = dataProvier.saveDataForUrl(req.query.url);
		res.send(perfData);
});

app.listen(3000);
console.log('Listening on port 3000...')