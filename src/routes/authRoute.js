const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');


router.post('/register', authController.RegisterAccount);
router.post('/login', authController.LoginAccount);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', authController.LogoutAccount);


module.exports = router;