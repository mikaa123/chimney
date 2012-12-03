var ansiHelper = require('./ansiHelper');

// Returns a fireplace object
module.exports = (function() {
	FIRE_COLORS = [124, 196, 202, 208, 214, 220, 226];
	var renderer;
	var fire = require('./fire')({
		width: 40,
		height: 15,
		maxIntensity: 20,
		interval: 100,
		ascii: [
			' ',
			ansiHelper.bgColor(FIRE_COLORS[0], '.'),
			ansiHelper.bgColor(FIRE_COLORS[1], ':'),
			ansiHelper.bgColor(FIRE_COLORS[2], '*'),
			ansiHelper.bgColor(FIRE_COLORS[3], 's'),
			ansiHelper.bgColor(FIRE_COLORS[4], 'S'),
			ansiHelper.bgColor(FIRE_COLORS[5], '#'),
			ansiHelper.bgColor(FIRE_COLORS[6], '$')
		]
	});

	var setRenderer = function setRenderer(r) {
		renderer = r;
	};

	var burnLogs = function burnLogs() {
		renderer('fireString');
	};

	return {
		setRenderer: setRenderer,
		burnLogs:		 burnLogs
	};

})();

