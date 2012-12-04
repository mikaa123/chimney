var fireWidth,
	fireHeight,
	fireIntensity,
	iterationCb,
	interval,
	ascii,
	fireSize,
	b,
	fireString;

var init = function init(options) {

	fireWidth			= options.width || 60,
	fireHeight		= options.height || 70,
	fireIntensity = options.maxIntensity,
	iterationCb		= options.iterationCb || null,
	interval			= options.interval,
	ascii					= options.ascii || [' ', '.', ':', '*', 's', ',', 'S', '#', '$'],
	fireSize			= fireWidth * fireHeight,
	b							= [];

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

	iterationCb(fireString);
	setTimeout(fireIteration, interval);
}

var startFire = function startFire(consumeLogCb, interval) {
	setInterval(consumeLogCb, interval);
	fireIteration();
}

var stopFire = function stopFire() {

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
