'use strict';

var childProcess = require('child_process');

var api = require('fie-api');

var log = api.log('static-proxy');

function execSync(cmd) {
  var stdout;
  var status = 0;

  try {
    stdout = childProcess.execSync(cmd);
  } catch (err) {
    stdout = err.stdout;
    status = err.status;
  }

  return {
    stdout: stdout.toString(),
    status: status
  };
}

module.exports = function () {
  var result = execSync('sudo bash -c \'echo "$(logname) ALL=(root) NOPASSWD: /usr/sbin/networksetup" | (EDITOR="tee -a" visudo)\'\n');

  if (result.status === 0) {
    // success
    log.success('Execute sudo without Password for networksetup command , success!');
  } else {
    log.error(result);
  }
};