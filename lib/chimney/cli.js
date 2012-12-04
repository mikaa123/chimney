var ansiHelper = require('./ansiHelper'),
	fireplace = require('./fireplace');

// This is usually run from the command-line.
var cli = module.exports = function() {
	fireplace.burnLogs(15, function(fireString) {
		console.log(ansiHelper.writeFrame(fireString));
	});
}
