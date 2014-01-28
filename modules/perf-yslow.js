var YSlow = require('yslowjs'); 


/*
	Yslow dataprovider for perf-tool

	Dataprovider can be swapped out for pagespeed (etc)
*/
var perfYSlow = function(){

	var _url = "";

	var yslowRules = ['--info', 'all'];

	var parseRawDataIntoRecord = function(data){
		return {
			url: _url,
			date: Date(),
			totalPageSize : data.w,
			totalNumberOfJavaScriptRequests: data.stats.js.r,
			totalNumberOfCSSRequests: data.stats.css.r,
			totalNumberOfRequests: data.r,
			loadTime: data.lt
		}
	};

	return {
		getPerformanceDataForUrl:function(url){
			_url = url;
			var yslow = new YSlow(_url, yslowRules);
			var results = yslow.runSync();
			var data = parseRawDataIntoRecord(results);
			return data;
		}
	}
}

module.exports = perfYSlow;