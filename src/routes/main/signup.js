'use strict';

import express, { Router } from 'express';
import models from '../../server/models/';
import Sequelize from 'sequelize';
import middleware from '../../middlewares/middleware';
import { emailValidator, phoneValidator } from '../../middlewares/validator';
import { parse, format, isValidNumber } from 'libphonenumber-js';

const signup = Router();

signup.use('/signup', (req, res) => {
	const countryCode = req.body.country_code;
	const formattedPhoneNumber = format(parse(req.body.user_name, countryCode) , 'International_plaintext');
	const isEmail = emailValidator(req.body.user_name);
	const isPhone = phoneValidator(formattedPhoneNumber);
	let user_name = req.body.user_name;
	let email = null;
	let phone_number = null;
	
	if (isEmail) {
		email = req.body.user_name;
	} else if (isPhone) {
		phone_number = formattedPhoneNumber;
	}
	
	models.User.create({
		user_name: req.body.user_name,
		phone_number: phone_number,
		email: email,
		password: req.body.password,
		hashed_pw: req.body.password	//This line added because the model only recognize hashed_pw NOT password.
	})
	.then(function(user) {
		let token = middleware.createToken(user);
		res.status(200).json({
			httpCode: 200,
			httpMessage: "OK",
			user,
			token
		})
	})
	.catch(Sequelize.ValidationError, (err) => {
		res.status(400).json({
			httpCode: 400,
			httpMessage: "Bad Request",
			errors: err.errors[0]
		})
	})
});

export default signup;