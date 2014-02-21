var assert = require('assert');
var gutil = require('gulp-util');
var cssjoin = require("./index.js")
var fs = require('fs')
var fixtureBase = "./node_modules/cssjoin/test/fixture/"
function assertFixture(dir, file, done){
  var stream = cssjoin()
  var baseDir = fixtureBase + dir + "/"
  var inputPath = baseDir + 'input/' + file
  var file = new gutil.File({
    path : inputPath,
    contents : fs.readFileSync(inputPath)
  })
  stream.on('data', function(data){
    expect = fs.readFileSync(baseDir + 'output/main.css', { encoding : 'utf-8' })
    assert.equal(data.contents.toString('utf8'), expect);
    done()
  })
  stream.write(file)
}
describe('gulp-cssjoin', function(){
  fs.readdirSync(fixtureBase).forEach(function(dir){
    it(dir, function(done){
      assertFixture(dir, 'main.css', done)
    })
  })
})