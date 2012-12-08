// Top level includes for chimney.
var cli       = require('./chimney/cli'),
    logParser = require('./chimney/parser');

module.exports.cli = cli;
module.exports.removeLogsForEachFiles = logParser.removeLogsForEachFiles;
