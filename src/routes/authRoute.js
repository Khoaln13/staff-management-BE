const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const middlewareController = require('../app/controllers/middlewareController')

router.post('/register', middlewareController.verifyTokenAndAdminAuth, authController.RegisterAccount);
router.post('/login', authController.LoginAccount);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', authController.LogoutAccount);


module.exports = router;