const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/Forum');
const authAdmin = require('../middleware/authAdmin');

// user can see the forums
router.get('/', authAdmin, forumCtrl.getAllForums);
// admin can create a forum
router.post('/', authAdmin, forumCtrl.createForum);
// user can see a forum
router.get('/:id', authAdmin, forumCtrl.getOneForum);
// admin can update a forum's info
router.put('/:id', authAdmin, forumCtrl.updateForum);
// admin can delete a forum
router.delete('/:id', authAdmin, forumCtrl.deleteForum);

module.exports = router;