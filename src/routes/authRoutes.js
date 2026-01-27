const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// URL: http://localhost:3000/api/auth/login
router.post('/login', AuthController.login);

module.exports = router;