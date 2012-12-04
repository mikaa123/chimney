var fireWidth,
	fireHeight,
	fireIntensity,
	iterationCb,
	iterationInterval,
	ascii,
	fireSize,
	b,
	fireString,
	state,
	consumePid;

var init = function init(options) {

	fireWidth					= options.width || 60,
	fireHeight				= options.height || 70,
	fireIntensity 		= options.maxIntensity,
	iterationCb				= options.iterationCb || null,
	iterationInterval	= options.iterationInterval,
	consumeInterval	= options.consumeInterval,
	ascii							= options.ascii || [' ', '.', ':', '*', 's', ',', 'S', '#', '$'],
	fireSize					= fireWidth * fireHeight,
	b									= [];

	for (i = 0; i < fireSize + fireWidth + 1; i++) {
		b[i] = 0;
	}
}

var setIntensity = function setIntensity(intensity) {
	fireIntensity = intensity;
}

var	getIntensity = function getIntensity() {
	return fireIntensity;
}

var setIterationCb = function setIterationCb(cb) {
	iterationCb = cb;
}

var fireIteration = function fireIteration() {
	for (i = 0; i < 10; i++) {
		b[Math.floor(Math.random() * fireWidth) + fireWidth * (fireHeight - 1)] = fireIntensity;
	}
	fireString = "";
	for (i = 0; i < fireSize; i++) {
		b[i] = Math.floor((b[i] + b[i + 1] + b[i + fireWidth] + b[i + fireWidth + 1]) / 4);
		fireString += ascii[b[i] > 7 ? 7 : b[i]];

		if (i % fireWidth > (fireWidth - 2)) {
			fireString += "\r\n";
		}
	}

	setTimeout(fireIteration, iterationInterval);

	if (state === 'STARTED') {
		iterationCb(fireString);
	}
}

var startFire = function startFire(options) {
	state = 'STARTED'

	consumePid	= setInterval(options.consume, consumeInterval);
	iterationCb = options.renderer;
	fireIteration();
}

var stopFire = function stopFire() {
	state = 'ENDED';
	clearInterval(consumePid);
}

module.exports = {
	init:						 init,
	setIntensity:		 setIntensity,
	getIntensity:		 getIntensity,
	setIterationCb:  setIterationCb,
	startFire:			 startFire,
	stopFire:				 stopFire,
	fireIteration:	 fireIteration
};
