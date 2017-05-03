'use strict';

import express, { Router } from 'express';
import models from '../../server/models/';
import Sequelize from 'sequelize';
import middleware from '../../middlewares/middleware';
import bcrypt from 'bcrypt';

const auth = Router();

auth.post('/auth', (req, res) => {
	if ( req.body.user_name && req.body.password ){
		/***
		 * find user based on user_name
		 */
		models.User.findOne({
			where: {
				user_name: req.body.user_name
			}
		})
		.then(function(){
			if (!user){
				res.status(404).json({
					httpCode: 404,
					httpMessage: 'Not Found',
					error: {
						message: 'Username does not exists'
					}
				})
			} else {
				/**
				 * compare incoming password vs hash
				 */
				const verifyOk = bcrypt.compareSync(req.body.password, user.password);
				if (verifyOk){
					let generatedToken = middleware.createToken(user);
					res.status(200).json({
						httpCode: 200,
						httpMessage: 'Authenticated',
						userToken: generatedToken
					})
				} else {
					res.status(401).json({
						httpCode: 401,
						httpMessage: 'Unauthorized',
						error: {
							message: 'Incorrect password'
						}
					})
				}
			}
		})
	} else {
		/**
		 * user_name or password is missing
		 */
		res.status(400).json({
			httpCode: 400,
			httpMessage: 'Bad Request',
			error: {
				message: 'Username and Password cannot be empty'
			}
		})
	}
})

export default auth;

/*
router.post('/auth', function(req, res) {

	if (req.body.email && req.body.password) {
		// find user using email
		models.User.findOne({
			where: {
				email: req.body.email
			}
		}).then(function(user) {
			if (!user) {
				res.json({
					status: 404,
					text: "Not Found",
					error: {
						message: "User not found"
					}
				})
			}else if(user) {
				
				// compare incoming password with hash from db
				var ok = bcrypt.compareSync(req.body.password, user.password);
				if(!ok) {
					
					// wrong password
					res.json({
						status: 401,
						text: "Unauthorized",
						error: {
							message: "Password salah."
						}
					});
					
				} else {
					
					// authenticated. create the token
					var token = middleware.createToken(user);
					
					res.json({
						status: 200,
						text: "Authenticated",
						token: token
					})
				}
			}
		})
	} else {
		
		// Email or Password is empty. Return error 400
		res.json({
			status: 400,
			text: "Bad Request",
			error: {
				message: "Email / Password tidak boleh kosong"
			}
		})
	}
	
});

module.exports = router
*/