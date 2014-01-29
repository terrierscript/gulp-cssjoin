var through = require('through2');
var cssjoin = require('cssjoin');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var defaults = require('lodash.defaults');

module.exports = function(options){
  function transform(file, enc, callback){
    var self = this;
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-cssjoin', 'Streaming not supported'));
    }
    var str = file.contents.toString('utf8');

    var opts = defaults(options || {}, {
      paths : [ path.dirname(file.path)]
    })
    console.log(file)
    cssjoin(file, options, function(err, css){

    })
  })

  return through.obj(transform);
}