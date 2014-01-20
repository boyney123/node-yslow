var YSlow = require('yslowjs'); 


var perfYSlow = function(){

	var _url = "";

	var yslowRules = ['--info', 'all'];

	var parseRawDataIntoRecord = function(data){
		return {
			date: new Date(),
			totalPageSize : data.w,
			totalNumberOfRequests: data.r,
			loadtime: data.lt
		}
	};

	return {
		saveDataForUrl:function(url){
			_url = url;
			var yslow = new YSlow(_url, yslowRules);
			var results = yslow.runSync();
			var data = parseRawDataIntoRecord(results);
			return data;
		}
	}
}

module.exports = perfYSlow;