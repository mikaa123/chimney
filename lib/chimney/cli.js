var ansiHelper = require('./ansiHelper'),
    fireplace = require('./fireplace'),
    parser = require('./parser'),
    dir = process.argv[2];

// This is usually run from the command-line.
var cli = module.exports = function() {

  if (typeof dir === 'undefined') {
    console.log("Hello! You need to specify a path to start Chimney.");
  } else {

    console.log('Looking for logs in', dir);
    try {
      parser.getLogs(dir, function(logs) {

        fireplace.start(logs.length, function(fireString) {

          // This callback is called each time there's a new
          // fire animation.
          //
          // It is used to upadate the screen.
          console.log(ansiHelper.writeFrame(fireString));
          console.log(ansiHelper.color(3, 'Burning ' + logs[fireplace.getRemainingLogs()]) + '\033[0m');
          console.log('Remaining logs:', fireplace.getRemainingLogs());

        }, function() {

          // This callback is called once the fire has consumed
          // all the logs.
          console.log(ansiHelper.color(3, 'Done! You just consumed ' + logs.length + ' logs.') + '\033[0m');

          process.exit();
        });
      });
    } catch(e) {
      console.log("Oops. Error, here is the stack:", e);
    }
  }

}
