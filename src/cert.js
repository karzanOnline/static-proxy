/**
 * 生成anyproxy证书
 */

const spawn = require('cross-spawn');

module.exports = function* () {
  spawn.sync(require.resolve('anyproxy/bin/anyproxy-ca'), { stdio: 'inherit' });
};
