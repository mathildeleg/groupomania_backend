const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/Forum');

router.get('/', forumCtrl.getAllForums);
router.post('/', forumCtrl.createForum);
router.get('/:id', forumCtrl.getOneForum);
router.put('/:id', forumCtrl.updateForum);
router.delete('/:id', forumCtrl.deleteForum);

module.exports = router;