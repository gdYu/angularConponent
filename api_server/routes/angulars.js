'use strict';
var express = require('express');
var angularDao = require('../dao/angularsDao');
var router = express.Router();

router.get('/querySupplier', function(req, res) {
	angularDao.query(req,res);
});

router.post('/updateSupplier', function(req, res) {
	angularDao.update(req,res);
});

module.exports = router;
