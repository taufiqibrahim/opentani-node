'use strict';
import { parse, isValidNumber } from 'libphonenumber-js';

module.exports = {
	
	// email validator
	emailValidator: function(email) {
		
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		return emailRegex.test(email);
	},
	
	// phone number validator
	phoneValidator: function(phone_number) {
		
		return isValidNumber(parse("085287007720", "ID"));
	}
}