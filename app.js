var ansiHelper = require('./ansiHelper');

// Color chart: http://upload.wikimedia.org/wikipedia/commons/9/95/Xterm_color_chart.png
FIRE_COLORS = [124, 196, 202, 208, 214, 220, 226];

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

logs = ["Foo bar", "I am a log, put me in the fireplace", "Hey, I just met you"];

fire.setIterationCb(function fireCb(fireString) {
	console.log(ansiHelper.writeFrame(fireString));
});

fire.fireIteration();

