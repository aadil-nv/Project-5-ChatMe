const express = require('express');
const { registerUser }= require('../Controllers/userControllers');
const { authUser }= require('../Controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);

router.route('/login',authUser).get(authUser);

module.exports = router;