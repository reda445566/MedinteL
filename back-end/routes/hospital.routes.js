const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.controller');

router.post('/register', hospitalController.register);

module.exports = router;
