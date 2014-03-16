var through = require('through2');
var cssjoin = require('cssjoin');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path')
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
      return callback()
    }
    

    var opts = defaults(options || {}, {
      paths : [ path.dirname(file.path)]
    })
    cssjoin(file.path, options, function(err, css){
      if (err) {
        self.emit('error', new PluginError('glup-cssjoin', err))
      } else {
        file.contents = new Buffer(css);
        self.push(file)
      }
      callback();
    })
  }
  return through.obj(transform);
}