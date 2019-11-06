var start = require('./lib/start');
var cert = require('./lib/cert');
var disable = require('./lib/disable');

// 设置变量环境当前文件夹名字
process.env.FIE_CONFIG_FILE = 'proxy.config.js';

module.exports = {
  start: start,
  cert: cert,
  disable: disable
};
