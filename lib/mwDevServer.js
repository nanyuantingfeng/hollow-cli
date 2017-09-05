'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _plugins = require('./plugins');

var _createDomain = require('webpack-dev-server/lib/util/createDomain');

var _createDomain2 = _interopRequireDefault(_createDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
function defaultTo(a, b) {
  return a ? a : b;
}

var DEFAULT_PORT = 8080;
var DEFAULT_HOST = '127.0.0.1';

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, next) {
    var devServer, webpackConfig, _webpackConfig$plugin, plugins, _webpackConfig$devSer, host, port, port0, port1, uri;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context.devServer = {};

            next();

            devServer = context.devServer, webpackConfig = context.webpackConfig;
            _webpackConfig$plugin = webpackConfig.plugins, plugins = _webpackConfig$plugin === void 0 ? [] : _webpackConfig$plugin;
            _webpackConfig$devSer = webpackConfig.devServer = (0, _extends3.default)({
              hot: true,
              hotOnly: true,
              contentBase: false,
              inline: true,
              noInfo: false,
              host: DEFAULT_HOST,
              port: context.port || DEFAULT_PORT
            }, devServer), host = _webpackConfig$devSer.host, port = _webpackConfig$devSer.port;


            port = port === DEFAULT_PORT ? defaultTo(context.port, port) : defaultTo(port, context.port);

            port0 = port;
            port1 = port + 1;


            webpackConfig.devServer.port = port0;

            uri = (0, _createDomain2.default)({ port: port0, host: host });


            webpackConfig.plugins = [new _plugins.HotModuleReplacementPlugin(), new _plugins.NamedModulesPlugin(), new _plugins.BrowserSyncPlugin({
              host: host,
              port: port1,
              proxy: uri
            }, { reload: true })].concat((0, _toConsumableArray3.default)(plugins));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];