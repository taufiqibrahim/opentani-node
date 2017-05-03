'use strict';

var _libphonenumberJs = require('libphonenumber-js');

module.exports = {

	// email validator
	emailValidator: function emailValidator(email) {

		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return emailRegex.test(email);
	},

	// phone number validator
	phoneValidator: function phoneValidator(phone_number) {

		return (0, _libphonenumberJs.isValidNumber)((0, _libphonenumberJs.parse)("085287007720", "ID"));
	}
};
//# sourceMappingURL=validator.js.map