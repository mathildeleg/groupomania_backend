const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const profileCtrl = require('../controllers/Profile');

router.get('/byId/:id', auth, profileCtrl.getOneProfile);
router.put('/byId/:id', auth, profileCtrl.updateProfile);
router.delete('/byId/:id', auth, profileCtrl.deleteProfile);

module.exports = router;