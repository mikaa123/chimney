var esprima = require('esprima'),
    escodegen = require('escodegen'),
    fs = require('fs'),
    walk = require('walkdir');

// Factory method to create log visitors objects that respond
// to `enter`, as defined in escodegen's visitor interface. 
//
// Visitors created with this factory method will execute the
// given `action` callback if the visited node is a `console.*`.
//
// action - The callback to executed on a console.* node.
//          node   - The AST's console.* node.
//          parent - The node's parent.
//
// Returns a new logVisitor object.
var logVisitorFactory = function (action) {

  var isLog = function(node) {
    return node.type  === 'ExpressionStatement' &&
           node.expression &&
           node.expression.type === 'CallExpression' &&
           node.expression.callee &&
           node.expression.callee.object &&
           node.expression.callee.object.name === 'console';
  }

  return {
    enter: function(node, parent) {
      if (isLog(node)) {
        action(node, parent);
      }
    }
  };
};

// Walks down the given directory and read each file.
//
// dir     - The starting directory.
// cb      - A callback to be executed for each file.
//           content - A String (utf-8) representation of
//                     the file.
// done    - Callback executed when it's done.
//
// Returns nothing.
var walkAndRead = function (dir, cb, done) {
  var emitter = walk(dir);

  emitter.on('file', function (filename, stat) {
    cb(fs.readFileSync(filename, 'utf-8'));
  });

  emitter.on('fail', function (error, path) {
    throw "Failing while looking up " + path;
  });

  emitter.on('error', function (error, path) {
    throw "Error while looking up " + path;
  });

  emitter.on('end', function () {
    done();
  });
}

// getLogs retrieves all the logs in the files, directories and
// subdirectories of `dir`.
//
// Once this is done, it calls the `done` callback with the logs.
//
// dir  - The starting directory.
// done - Callback executed when the parser finished collecting logs.
//        logs - An array containing each logs.
//
// Returns nothing.
var getLogs = module.exports.getLogs = function (dir, done) {
  var logs = [];

  walkAndRead(dir, function (content) {
    try { 
      var ast;

      ast = esprima.parse(content, {tolerant: true}); 

      // This visitor pushes each console log in `log`.
      escodegen.traverse(ast, logVisitorFactory(function(node, parent) {
        logs.push(escodegen.generate(node));
      }));
    } catch (e) {}
  }, function() {
    done(logs);
  });
};

// Takes code and returns it purged of all console.* calls.
//
// code - A String.
//
// Returns a String.
var stripLogs = module.exports.stripLogs = function (code) {
  var ast;

  try { 
    ast = esprima.parse(code, {tolerant: true}); 

    // This visitor takes out of the AST each console.*
    escodegen.traverse(ast, logVisitorFactory(function(node, parent) {
      if (parent.body) {
        parent.body.splice(parent.body.indexOf(node), 1);
      }
    }));

    code = escodegen.generate(ast);
  } catch (e) {}

  return code;
}

// For each files in `dir`, remove the logs and call `cb` with a String
// of the code without the logs.
//
// dir - The starting point to lookup files.
// cb  - What to execute once the logs are removed.
//       content - String of the code of the file without the log.
//
// Returns nothing.
var removeLogsForEachFiles = module.exports.removeLogsForEachFiles = function (dir, cb) {
  walkAndRead(dir, function (content) {
    cb(stripLogs(content));
  }, function() {});
};
