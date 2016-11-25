'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {
  res.json({
	  status: 200,
	  text: "API Opentani is working!"
  });
});

module.exports = router