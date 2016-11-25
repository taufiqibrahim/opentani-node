'use strict';

var router = require('express').Router();
var models = require('../../server/models/index');
var Sequelize = require('sequelize');
var middleware = require('../../middlewares/middleware')

router.post('/signup', function(req, res) {
	models.User.create({
		ektp_id: req.body.ektp_id,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}).then(function(user) {		
		var token = middleware.createToken(user);
		res.json({
			status: 200,
			text: "User created",
			user,
			token
		});
	})
	.catch(Sequelize.ValidationError, function(err) {
		res.json({
			status: 400,
			text: "Error",
			error: err.errors[0]
		})
	});
});

module.exports = router