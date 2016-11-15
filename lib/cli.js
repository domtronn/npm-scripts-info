#!/usr/bin/env node
var info = require('./');
var meow = require('meow');
var fs = require('fs');

var cli = meow([
  'Usage',
  '  npm-scripts-info [hr]',
  '',
  'Options',
  ' --help, -h         Display usage',
  ' --version, -v      Display version',
  ' --reporter, -r     Specify the custom reporter to be used',
  '',
  'Examples',
  '  npm-scripts-info -r=my-reporter'
].join('\n'), {
  string: ['reporter'],
  alias: {
    help: 'h',
    version: 'v',
    reporter: 'r'
  }
});

var scripts = info();

var reporter = './reporter';
if (cli.flags.reporter) {
  reporter = fs.statSync(cli.fags.reporter).isFile()
    ? cli.flags.reporter
    : 'npm-scripts-info-' + cli.falgs.reporter;
}

require(reporter)(scripts);
