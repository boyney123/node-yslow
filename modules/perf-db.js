var mongoose = require('mongoose'); 

//connect to mongo db
mongoose.connect('mongodb://localhost/test');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));

var db = function(){

	//Scema for a performance data item
	var perfRecordSchema = mongoose.Schema({
    	url: String,
    	date: { type: Date},
    	totalNumberOfRequests: Number, 
    	totalPageSize: Number,
    	loadTime: Number
	});

	var PerformanceRecord = mongoose.model('PerfRecord', perfRecordSchema)

	return {
		/*
			Using mongo save the new record inside the PerfRecord collection
		*/
		savePerformanceData:function(data, callback){
			var newRecord = new PerformanceRecord(data);
			newRecord.save(callback);
		},
		/*
			Make a request to mongo to get the data required.
		*/
		getPerformanceData: function(options){

			var query = {
				url: options.url
			};

			if(options.startDate){
				from = options.startDate.split("-");
				query.date = {
					"$gte" : new Date(new Date(from[2], from[1] - 1, from[0]))
				}
			}

			PerformanceRecord.find(query)
			.limit(options.limit)
			.exec(function(err, data){
				if(err) return options.error(err);
				options.success(data);
			});

		}
	}
}

module.exports = db;