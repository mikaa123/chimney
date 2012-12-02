// Returns an ANSI escape code helper object
module.exports = (function() {
	var CSI = '\033[',
	TOP = CSI + 'H',
	CLEAN_END = CSI + 'J',
	RESET = CSI + '0m';

	var color = function ansiColor(n, text) {
		return CSI + (30 + n) + 'm' + text;
	}

	var bgColor = function ansiBgColor(n, text) {
		return RESET + CSI + '48;5;' + n + 'm' + text + RESET;
	}

	var writeFrame = function writeFrame(content) {
		return TOP + CLEAN_END + content + RESET; // + SCROLL_DOWN;
	}

	return {
		color:			color,
		bgColor:		bgColor,
		writeFrame:	writeFrame
	};

})();
