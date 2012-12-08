var logParser = require('../lib/chimney/parser');

var testCases = [
'var foo = function() {\
  console.log("hey man");\
  return 1+1;\
};\
\
console.log("Calling foo");\
foo();',

'true ? console.log("ok") : 2'
]

describe('The log parser', function(){
  it ('should strip logs', function() {
    testCases.forEach(function(code) {
      expect(
        logParser.stripLogs(code).match('console')
      ).toBe(null);
    });
  });
});
