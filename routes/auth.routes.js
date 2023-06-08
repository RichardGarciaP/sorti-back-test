const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

router
    .route('/sign-in')
    .post(authController.signIn)

router
    .route('/sign-up')
    .post(authController.signUp)

router
    .route('/validate-token')
    .post(authController.validateToken)

module.exports = router;