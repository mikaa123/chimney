// FRAME_SIZE = 1;

CSI = '\033[';
TOP = CSI + 'H';
CLEAN_END = CSI + 'J';
RESET = CSI + '0m';
// SCROLL_DOWN = CSI + FRAME_SIZE + 'S';

// COLORS
LOG_COLOR = CSI + '48;5;386m';
LOG_BG = CSI + '48:5:52m'

// Color chart: http://upload.wikimedia.org/wikipedia/commons/9/95/Xterm_color_chart.png
// FIRE_COLORS = [226, 220, 214, 208, 202, 196, 124, 17];
FIRE_COLORS = [124, 196, 202, 208, 214, 220, 226];

var ansiColor = function ansiColor(n, text) {
	return CSI + (30 + n) + 'm' + text;
}

var ansiBgColor = function ansiBgColor(n, text) {
	return RESET + CSI + '48;5;' + n + 'm' + text + RESET;
}

var fire = require('./fire')({
	width: 40,
	height: 15,
	maxIntensity: 20,
	interval: 100,
	ascii: [
		' ',
		ansiBgColor(FIRE_COLORS[0], '.'),
		ansiBgColor(FIRE_COLORS[1], ':'),
		ansiBgColor(FIRE_COLORS[2], '*'),
		ansiBgColor(FIRE_COLORS[3], 's'),
		ansiBgColor(FIRE_COLORS[4], 'S'),
		ansiBgColor(FIRE_COLORS[5], '#'),
		ansiBgColor(FIRE_COLORS[6], '$')
	]
});

logs = ["Foo bar", "I am a log, put me in the fireplace", "Hey, I just met you"];

var writeFrame = function writeFrame(content) {
	return TOP + CLEAN_END + content + RESET; // + SCROLL_DOWN;
}

// var logToLog = function logToLog(log) {
// 	return LOG_COLOR + log + RESET;
// }

var burnLog = function burnLog() {

}

fire.setIterationCb(function fireCb(fireString) {
	console.log(writeFrame(fireString));
	// console.log(fireString.split(""));
});

fire.fireIteration();

// console.log(writeFrame("coucou"));
// fire.fireIteration(function fireCb(fireString) {
// 	console.log(fireString);
// 	setTimeout(function() {
// 		fire.fireIteration(fireCb);
// 	}, 30);
// });

// logs.forEach(function(l) {
// 	console.log(l);
// });

// console.log(writeFrame(logToLog('test')));

