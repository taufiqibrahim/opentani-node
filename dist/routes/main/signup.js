'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../server/models/');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _middleware = require('../../middlewares/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _validator = require('../../middlewares/validator');

var _libphonenumberJs = require('libphonenumber-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = (0, _express.Router)();
// import models from '../../server/models/';


signup.use('/', function (req, res) {
	var countryCode = req.body.country_code;
	var formattedPhoneNumber = (0, _libphonenumberJs.format)((0, _libphonenumberJs.parse)(req.body.user_name, countryCode), 'International_plaintext');
	var isEmail = (0, _validator.emailValidator)(req.body.user_name);
	var isPhone = (0, _validator.phoneValidator)(formattedPhoneNumber);
	var user_name = req.body.user_name;
	var email = null;
	var phone_number = null;

	if (isEmail) {
		email = req.body.user_name;
	} else if (isPhone) {
		phone_number = req.body.user_name;
	}

	_models.connection.models.User.create({
		user_name: req.body.user_name,
		phone_number: phone_number,
		email: email,
		password: req.body.password
	}).then(function (user) {
		var token = _middleware2.default.createToken(user);
		res.json({
			httpCode: 200,
			httpMessage: "OK",
			user: user,
			token: token
		});
	}).catch(_sequelize2.default.ValidationError, function (error) {
		res.json({
			httpCode: 400,
			httpMessage: "Bad Request",
			errors: err.errors[0]
		});
	});

	/*res.json({
 	status: 200,
 	text: "API Opentani is working!",
 	user_name: user_name,
 	email: email,
 	phone_number: formattedPhoneNumber,
 })*/
});

exports.default = signup;
//# sourceMappingURL=signup.js.map