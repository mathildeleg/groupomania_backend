const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const forumCtrl = require('../controllers/Forum');

router.get('/', auth, forumCtrl.getAllForums);
router.post('/', auth, forumCtrl.createForum);
router.get('/byId/:id', auth, forumCtrl.getOneForum);
router.put('/byId/:id', auth, forumCtrl.updateForum);
router.delete('/byId/:id', auth, forumCtrl.deleteForum);

module.exports = router;