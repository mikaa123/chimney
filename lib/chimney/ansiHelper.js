// Returns an ANSI escape code helper object
var CSI = '\033[',
    TOP = CSI + 'H',
    CLEAN_END = CSI + 'J',
    RESET = CSI + '0m';

var color = module.exports.color = function (n, text) {
  return CSI + (30 + n) + 'm' + text;
};

var bgColor =  module.exports.bgColor = function (n, text) {
  return RESET + CSI + '48;5;' + n + 'm' + text + RESET;
};

var writeFrame = module.exports.writeFrame = function (content) {
  return TOP + CLEAN_END + content + RESET; // + SCROLL_DOWN;
};
