(function() {
  var argv, fs, parser, xml2js;

  argv = require('optimist').usage('Usage: $0 -s [path]').alias('s', 'source').describe('s', 'Path to source XML file')["default"]('s', './demo/build.xml').argv;

  fs = require('fs', xml2js = require('xml2js'));

  parser = new xml2js.Parser({
    attrkey: 'attr'
  });

  fs.readFile(argv.s, function(err, data) {
    if (!err) {
      return parser.parseString(data, function(err, result) {
        return fs.writeFile('./dist/build.json', JSON.stringify(result));
      });
    }
  });

}).call(this);

/*
//@ sourceMappingURL=generate.js.map
*/