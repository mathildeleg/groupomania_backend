const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');

// user can sign up and access the forum
router.post('/signup', userCtrl.signup);
// user can login and access the forum
router.post('/login', userCtrl.login);

module.exports = router;
