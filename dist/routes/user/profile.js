'use strict';

var router = require('express').Router();
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var models = require('../../server/models/index');
var middleware = require('../../middlewares/middleware');

router.get('/profile', middleware.verifyToken, function (req, res) {

	// Find user by id
	models.User.findOne({
		where: {
			id: req.decoded.user
		}
	}).then(function (user) {
		if (!user) {
			res.json({
				status: 404,
				text: "Internal error. User not found"
			});
		} else {
			res.json({
				status: 200,
				text: "Welcome " + user.username
			});
		}
	});
});

module.exports = router;
//# sourceMappingURL=profile.js.map