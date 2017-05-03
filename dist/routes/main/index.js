'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _signup = require('./signup');

var _signup2 = _interopRequireDefault(_signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = (0, _express.Router)();
Main.get('/test', _test2.default);
Main.post('/signup', _signup2.default);

exports.default = Main;
//# sourceMappingURL=index.js.map