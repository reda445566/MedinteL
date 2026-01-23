const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const chatbotController = require('../controllers/chatbot.controller');

router.post('/query', protect, chatbotController.chatQuery);

module.exports = router;
