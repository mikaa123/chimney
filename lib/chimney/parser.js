var esprima = require('esprima'),
    escodegen = require('escodegen'),
    fs = require('fs'),
    logs = [];

// walk recursively list all the files in the given
// directory and subdirectories.
//
// See http://stackoverflow.com/q/5827612/ for more.
//
// dir  - The starting directory.
// done - A callback that takes:
//        err    - true if there's an error.
//        result - An array of files.
//
// Returns nothing.
function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) {
      return done(err);
    }
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) {
        return done(null, results);
      }
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          if (!file.match('\.git')) {
            console.log('processing', file);
            walk(file, function (err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            console.log('git found');
            next();
          }
        } else {
          results.push(file);
          next();
        }
      });
    }());
  });
}

var logVisitor = (function() {
  var report = function report(node) {
    logs.push(escodegen.generate(node));
  }

  var isLog = function(node) {
    return node.type               === 'CallExpression' &&
           node.callee             &&
           node.callee.object      &&
           node.callee.object.name === 'console';
  }

  var enter = function(node, parent) {
    if (isLog(node)) {
      report(node);
    }
  }

  return {
    enter: enter
  };
})();

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
var getLogs = module.exports.getLogs = function getLogs(dir, done) {
  walk(dir, function(err, results) {
    results.forEach(function(filename) {
      var content,
          ast;

      try { 
        content = fs.readFileSync(filename, 'utf-8'); ast = esprima.parse(content, {tolerant: true}); 
        escodegen.traverse(ast, logVisitor);
      } catch (e) {
      }
    });

    done(logs);
  });
}
