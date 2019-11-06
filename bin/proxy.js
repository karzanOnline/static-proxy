#!/usr/bin/env node
const program = require('commander');

const start = require('../lib/start');
const cert = require('../lib/cert');
const pkg = require('../package.json');

program.version(pkg.version)
  .option('start', '本地调试模板代码')
  .parse(process.argv);

if (program.start) {
  start({enable: true});
}

if (program.cert) {
  cert(process.argv);
}
