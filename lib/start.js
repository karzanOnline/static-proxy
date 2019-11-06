'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var api = require('fie-api');

var AnyProxy = require('anyproxy');

var argv = require('yargs').help(false).argv;

var enable = require('./enable');

var disable = require('./disable');

var log = api.log('static-proxy');
var config = api.config;

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(options) {
    var assetsCfg, commonCfg, defaultOptions, serverOption, proxyServer, isEnableSystemProxy;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!config.exist()) {
              // 不存在配置文件走默认
              assetsCfg = {};
            } else {
              assetsCfg = api.config.get('proxy') || {};
            }

            commonCfg = assetsCfg.common || {};
            defaultOptions = {
              on: true,
              port: 8001,
              webInterface: {
                enable: true,
                webPort: 8002,
                wsPort: 8003
              },
              forceProxyHttps: true,
              dangerouslyIgnoreUnauthorized: true,
              silent: true,
              https: true
            };
            serverOption = Object.assign({}, defaultOptions, commonCfg);
            serverOption.rule = require('../rule')(assetsCfg);
            proxyServer = new AnyProxy.ProxyServer(serverOption);
            isEnableSystemProxy = options.enable || false;

            if (isEnableSystemProxy) {
              enable(options || {});
            }

            proxyServer.on('ready', function () {
              log.success('proxy server start : http://127.0.0.1:8002');
            });
            proxyServer.on('error', function (e) {
              if (process.env.FIE_PROSY_SYSTEM) {
                disable();
              }

              console.log('proxy error');
              console.log(e);
            }); // ctrl + c

            process.on('SIGINT', function () {
              // 若设置了全局代理，则需要清除
              if (process.env.FIE_PROSY_SYSTEM) {
                disable();
              }

              proxyServer.close();
              process.exit();
            }); // close terminal

            process.on('SIGHUP', function () {
              // 若设置了全局代理，则需要清除
              if (process.env.FIE_PROSY_SYSTEM) {
                disable();
              }

              proxyServer.close();
              process.exit();
            });
            proxyServer.start();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();