const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { createOrUpdateProfile, getProfile } = require('../controllers/patientMedical.controller');

router.post('/medical-profile', protect, createOrUpdateProfile);
router.put('/medical-profile', protect, createOrUpdateProfile); // Using same controller logic for update
router.get('/medical-profile', protect, getProfile);

module.exports = router;
