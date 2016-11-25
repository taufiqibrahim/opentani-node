'use strict';

var router = require('express').Router();

// Routes list
router.use('/test', require('./test'));
router.post('/signup', require('./signup'));
router.post('/auth', require('./auth'));

module.exports = router;