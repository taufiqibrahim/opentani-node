'use strict';

import express, { Router } from 'express';
import models from '../../server/models/';
import Sequelize from 'sequelize';
import middleware from '../../middlewares/middleware';
import bcrypt from 'bcrypt';

const login = Router();

login.post('/login', (req, res) => {
	if ( req.body.user_name && req.body.password ){
		/***
		 * find user based on user_name
		 */
		models.User.findOne({
			where: {
				user_name: req.body.user_name
			}
		})
		.then(function(user){
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
				const verifyOk = bcrypt.compareSync(req.body.password, user.hashed_pw);
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

export default login;