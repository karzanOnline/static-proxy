'use strict';

var api = require('fie-api');

var systemProxy = require('./systemProxyMgr');

var log = api.log('static-proxy');

module.exports = function () {
  // const result = systemProxy.disableGlobalProxy();
  var result_https = systemProxy.disableGlobalProxy('https');

  if (result_https.status === 0) {
    // success
    log.success('Successfully clean system web proxy setting !');
  } else {
    log.error(result_https); // log.error(result_https);
  }
};