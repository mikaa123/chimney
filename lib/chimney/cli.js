var ansiHelper = require('./ansiHelper'),
	fireplace = require('./fireplace'),
	parser = require('./parser'),
	dir = process.argv[2];

// This is usually run from the command-line.
var cli = module.exports = function() {
	console.log('Looking for logs in', dir);

	parser.getLogs(dir, function(logs) {

		fireplace.start(logs.length, function(fireString) {

			// This callback is called each time there's a new
			// fire animation.
			//
			// It is used to upadate the screen.
			console.log(ansiHelper.writeFrame(fireString));
			console.log('Burning', logs[fireplace.getRemainingLogs()]);
			console.log('Remaining logs:', fireplace.getRemainingLogs());

		}, function() {

			// This callback is called once the fire has consumed
			// all the logs.
			console.log('Done!');
		});
	});
}
