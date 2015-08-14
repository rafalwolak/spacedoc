var fs      = require('fs');
var path    = require('path');
var through = require('through2');
var vfs     = require('vinyl-fs');

var s;

function init(options) {
  s.options = options;

  if (options.src) {
    var stream = vfs.src(options.src, {base: options.base}).pipe(transform());

    if (options.debug) {
      stream.on('finish', function() {
        fs.writeFile(options.debug, JSON.stringify(debugTree, null, '  '));
      });
    }

    return stream;
  }
  else {
    return transform();
  }

  function transform() {
    return through.obj(function(file, enc, cb) {
      s.parse(file, function(data) {
        // Change the extension of the incoming file to .html,
        // and replace the Markdown contents with rendered HTML
        var ext = path.extname(file.path);
        file.path = file.path.replace(new RegExp(ext+'$'), '.html');
        file.contents = new Buffer(s.build(data));

        if (options.dest) {
          var filePath = path.join(options.dest, path.basename(file.path));
          fs.writeFileSync(filePath, file.contents.toString());
        }

        s.tree.push(data[0]);

        cb(null, file);
      });
    });
  }
}

module.exports = function(obj) {
  s = obj;
  return init;
}