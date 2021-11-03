const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const profileCtrl = require('../controllers/Profile');

// user can see their profile
router.get('/me', auth, profileCtrl.getOneProfile);
// user can update their profile
router.put('/me/update', auth, profileCtrl.updateProfile);
// user can delete their profile / account
router.delete('/me/delete', auth, profileCtrl.deleteProfile);

module.exports = router;