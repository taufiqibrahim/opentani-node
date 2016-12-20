'use strict';

var router = require('express').Router();
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt')
var models = require('../../server/models/index');
var middleware = require('../../middlewares/middleware')

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