var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var Sequelize = require('sequelize')
var port = process.env.PORT || 3000

// Get request parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log to console
app.use(morgan('dev'));

// *** Routes *** //
app.use('/', require('./routes'));
	// *** Main routes *** //

	// *** User routes *** //

	// *** Geo routes *** //

// Demo ROUTE (GET http://localhost:3000/)
app.get('/', function(req, res) {
 res.send('API is running on http://localhost:' + port + '/api')
})

// Start the server
app.listen(port)