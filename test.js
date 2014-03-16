var assert = require('assert');
var gutil = require('gulp-util');
var cssjoin = require("./index.js")
var fs = require('fs')
var fixtureBase = "./node_modules/cssjoin/test/fixture/"

describe('gulp-cssjoin', function(){
  it("basic", function(done){
    var stream = cssjoin()
    var inputPath = fixtureBase + '/basic/input/main.css'
    var outputPath = fixtureBase + '/basic/output/main.css'
    var file = new gutil.File({
      path : inputPath,
      contents : fs.readFileSync(inputPath)
    })
    stream.on('data', function(data){
      expect = fs.readFileSync(outputPath, { encoding : 'utf-8' })
      assert.equal(data.contents.toString('utf8'), expect);
      done()
    }).on('end', function(){
    })
    stream.write(file)
  })
  it("path option", function(done){
    var stream = cssjoin({
      paths : [
        fixtureBase + "/resolve_path/input/htdocs",
        fixtureBase + "/resolve_path/input/htdocs2"
      ]
    })
    var inputPath = fixtureBase + '/resolve_path/input/main.css'
    var outputPath = fixtureBase + '/resolve_path/output/main.css'
    
    var file = new gutil.File({
      path : inputPath,
      contents : fs.readFileSync(inputPath)
    })
    stream.on('data', function(data){
      expect = fs.readFileSync(outputPath, { encoding : 'utf-8' })
      assert.equal(data.contents.toString('utf8'), expect);
      done()
    })
    stream.write(file)
  })

  it("throw when null", function(done){
    var stream = cssjoin()
    var nullFile = new gutil.File()
    stream.on('data',function(file){
      assert.deepEqual(file, nullFile)
    }).on('end', function(){
      done()
    })
    stream.write(nullFile)
    stream.end()
  })

  it("stream is not supported ", function(done){
    var stream = cssjoin()
    var streamFile = {
      isNull: function () { return false; },
      isStream: function () { return true; }
    };
    stream.on('error', function (err) {
      assert.equal('Streaming not supported', err.message);
      done();
    });
    stream.write(streamFile);
  })
})