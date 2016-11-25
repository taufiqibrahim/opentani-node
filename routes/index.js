'use strict';

var router = require('express').Router();

// Plug: main routes
router.use('/', require('./main'));

module.exports = router;