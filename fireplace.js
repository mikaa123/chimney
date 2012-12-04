var ansiHelper = require('./ansiHelper'),
	fire = require('./fire'),

	// Color chart:
	// http://upload.wikimedia.org/wikipedia/commons/9/95/Xterm_color_chart.png
	FIRE_COLORS = [124, 196, 202, 208, 214, 220, 226],
	MAXIMUM_INTENSITY = 10,
	remainingLogs,
	renderer;

fire.init({
	width: 40,
	height: 15,
	maxIntensity: MAXIMUM_INTENSITY,
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

	fire.setIterationCb(function(fireString) {
		renderer(fireString);
	});
};

var burnLogs = function burnLogs(n) {
	remainingLogs = n;

	fire.startFire(function consumeLog() {
		if (remainingLogs > 0) {
			remainingLogs -= 1;

			if (remainingLogs <= MAXIMUM_INTENSITY) {
				fire.setIntensity(remainingLogs);
			}
		}
	}, 3000);
};

module.exports = {
	setRenderer: setRenderer,
	burnLogs:		 burnLogs
}
