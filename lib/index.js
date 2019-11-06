"use strict";

var start = require('./start');

var cert = require('./cert'); // 设置变量环境当前文件夹名字


process.env.FIE_CONFIG_FILE = 'proxy.config.js';
module.exports = {
  start: start,
  cert: cert
};