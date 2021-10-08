const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const profileCtrl = require('../controllers/Profile');

router.get('/me', auth, profileCtrl.getOneProfile);
router.put('/me/update', auth, profileCtrl.updateProfile);
router.delete('/me/delete', auth, profileCtrl.deleteProfile);

module.exports = router;