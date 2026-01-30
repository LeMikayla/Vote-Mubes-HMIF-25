const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

// URL: http://localhost:3000/api/auth/login
router.post('/login', AuthController.login);

router.get('/me', verifyToken, AuthController.me);

module.exports = router;