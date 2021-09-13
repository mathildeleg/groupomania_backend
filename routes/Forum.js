const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/Forum');

router.get('/', forumCtrl.getAllForums);
router.post('/', forumCtrl.createForum);
router.get('/byId/:id', forumCtrl.getOneForum);
router.put('/byId/:id', forumCtrl.updateForum);
router.delete('/byId/:id', forumCtrl.deleteForum);

module.exports = router;