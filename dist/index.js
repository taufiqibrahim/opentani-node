'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

// Get request parameter
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// Log to console
app.use((0, _morgan2.default)('dev'));

// *** Routes *** //
app.use('/v1', _routes2.default);

// Demo ROUTE (GET http://localhost:3000/)
app.get('/', function (req, res) {
  res.send('API is running on http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
//# sourceMappingURL=index.js.map