"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

/**
 * 生成anyproxy证书
 */
var spawn = require('cross-spawn');

module.exports =
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          spawn.sync(require.resolve('anyproxy/bin/anyproxy-ca'), {
            stdio: 'inherit'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
});