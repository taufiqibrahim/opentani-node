'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = (0, _express.Router)();

test.use('/', function (req, res) {
	res.json({
		status: 200,
		text: "API Opentani is working!"
	});
});

exports.default = test;
//# sourceMappingURL=test.js.map