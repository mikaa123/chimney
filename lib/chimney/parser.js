var esprima = require('esprima'),
    escodegen = require('escodegen'),
    fs = require('fs'),
    logs = [];

var report = function report(node) {
  logs.push(escodegen.generate(node));
}

// http://stackoverflow.com/q/5827612/
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

var traverse = function traverse(ast, visitor) {
  var key,
      child;

  visitor.call(null, ast);
  for (key in ast) {
    if (ast.hasOwnProperty(key)) {

      child = ast[key];

      if (typeof child === 'object' && child !== null) {
        traverse(child, visitor);
      }
    }
  }
}

var getLogs = module.exports.getLogs = function getLogs(dir, done) {
  walk(dir, function(err, results) {
    results.forEach(function(filename) {
      var content,
          ast;

      try { content = fs.readFileSync(filename, 'utf-8'); ast = esprima.parse(content, {tolerant: true}); 
        traverse(ast, function(node) {
          if (node.type === 'CallExpression') {

            if (node.callee && node.callee.object && node.callee.object.name === 'console') {
              report(node);
            }
          }
        });
      } catch (e) {
      }
    });

    done(logs);
  });
}
