const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/Profile');

router.get('/byId/:id', profileCtrl.getOneProfile);
router.put('/byId/:id', profileCtrl.updateProfile);
router.delete('/byId/:id', profileCtrl.deleteProfile);

module.exports = router;