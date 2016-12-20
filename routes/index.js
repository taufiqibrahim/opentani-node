'use strict';

var router = require('express').Router();

// Plug routes
router.use('/', require('./main'));
router.use('/', require('./user'));

module.exports = router;