var ansiHelper = require('./ansiHelper'),
	fireplace = require('./fireplace');

fireplace.setRenderer(function fireCb(fireString) {
		console.log(ansiHelper.writeFrame(fireString));
});

fireplace.burnLogs(15);
