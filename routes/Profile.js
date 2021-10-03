const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/Profile');

router.get('/:id', profileCtrl.getOneProfile);
router.put('/:id', profileCtrl.updateProfile);
router.delete('/:id', profileCtrl.deleteProfile);

module.exports = router;