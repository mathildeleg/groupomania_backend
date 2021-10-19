const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/Forum');
const authAdmin = require('../middleware/authAdmin');

router.get('/', authAdmin, forumCtrl.getAllForums);
router.post('/', authAdmin, forumCtrl.createForum);
router.get('/:id', authAdmin, forumCtrl.getOneForum);
router.put('/:id', authAdmin, forumCtrl.updateForum);
router.delete('/:id', authAdmin, forumCtrl.deleteForum);

module.exports = router;