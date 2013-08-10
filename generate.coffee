argv  = require('optimist')
  .usage('Usage: $0 -s [path]')
  .alias('s', 'source')
  .describe('s', 'Path to source XML file')
  .default('s', './demo/build.xml')
  .argv;

fs      = require 'fs',
xml2js  = require 'xml2js'

parser = new xml2js.Parser attrkey: 'attr'

fs.readFile argv.s, (err, data) ->
  if not err
    parser.parseString data, (err, result) ->
      fs.writeFile './dist/build.json', JSON.stringify result