'use strict';

var jwt = require('jsonwebtoken');
var secret = 'inibener2rahasialho';

module.exports = {

	// Create route middleware to create a token
	createToken: function createToken(user) {
		var token = jwt.sign({ user: user.id }, secret, { expiresIn: '2 days' });
		return token;
	},

	// Create route middleware to verify a token
	verifyToken: function verifyToken(req, res, next) {

		// Check header or URL parameter for token
		// var token = req.body.token;
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// Decode token
		if (token) {

			// Verify secret and check expiry
			jwt.verify(token, secret, function (err, decoded) {
				if (err) {
					res.json({
						success: false,
						msg: "Failed to authenticate token."
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {

			// No token provided
			res.json({
				success: false,
				msg: "No token provided."
			});
		}
	}
};
//# sourceMappingURL=middleware.js.map