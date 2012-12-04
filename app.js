var ansiHelper = require('./ansiHelper'),
	fireplace = require('./fireplace');

fireplace.burnLogs(15, function(fireString) {
	console.log(ansiHelper.writeFrame(fireString));
});
