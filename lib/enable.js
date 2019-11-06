'use strict';

var spawn = require('cross-spawn');

var api = require('fie-api');

var systemProxy = require('./systemProxyMgr');

var sudo = require('./sudo');

var log = api.log('static-proxy');
var config = api.config;

module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var assetsCfg; // 代理白名单

  var passdomain = null;

  if (!config.exist()) {
    // 不存在配置文件走默认
    assetsCfg = {};
  } else {
    assetsCfg = api.config.get('proxy') || options.proxy || {};
  }

  var commonCfg = assetsCfg.common || {}; // 默认 8001 端口，与start一致

  var defaultOptions = {
    port: 8001,
    host: '127.0.0.1'
  };

  if (assetsCfg.passdomain) {
    passdomain = assetsCfg.passdomain;
  }

  var serverOption = Object.assign({}, defaultOptions, commonCfg); // check 一下 是否需要sudo权限

  var checkResult = spawn.sync('sudo', ['-A', 'networksetup', '-version']); // 说明要开sudo权限

  log.debug("sudo -A check networksetup , status = ".concat(checkResult.status));

  if (checkResult.status !== 0) {
    sudo();
  } // const result_http = systemProxy.enableGlobalProxy(serverOption.host, serverOption.port, 'http', passdomain);


  var result_https = systemProxy.enableGlobalProxy(serverOption.host, serverOption.port, 'https', passdomain);

  if (result_https.status === 0) {
    process.env.FIE_PROSY_SYSTEM = true; // success

    log.success("Successfully enable system web proxy for ".concat(serverOption.host, ":").concat(serverOption.port, " !"));
  } else {
    log.error(result_https); // log.error(result_https);
  }
};