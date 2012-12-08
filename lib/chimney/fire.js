// This code is mostly taken from http://maettig.com/code/javascript/asciifire.html,
// a great ascii fire algorithm written by maettig.
//
// The modifications are mostly turning it into a node module and wrapping the algorithm
// with convinient methods to control things like intensity and events.

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

var init = module.exports.init = function (options) {

  fireWidth         = options.width || 60,
  fireHeight        = options.height || 70,
  fireIntensity     = options.maxIntensity,
  iterationCb       = options.iterationCb || null,
  iterationInterval = options.iterationInterval,
  consumeInterval = options.consumeInterval,
  ascii             = options.ascii || [' ', '.', ':', '*', 's', ',', 'S', '#', '$'],
  fireSize          = fireWidth * fireHeight,
  b                 = [];

  for (i = 0; i < fireSize + fireWidth + 1; i++) {
    b[i] = 0;
  }
};

var setIntensity = module.exports.setIntensity = function (intensity) {
  fireIntensity = intensity;
};

var getIntensity = module.exports.getIntensity = function () {
  return fireIntensity;
};

var setIterationCb = module.exports.setIterationCb = function (cb) {
  iterationCb = cb;
};

var fireIteration = module.exports.fireIteration = function () {
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
};

var startFire = module.exports.startFire = function (options) {
  state = 'STARTED'

  consumePid  = setInterval(options.consume, consumeInterval);
  iterationCb = options.renderer;
  fireIteration();
};

var stopFire = module.exports.stopFire = function () {
  state = 'ENDED';
  clearInterval(consumePid);
};
