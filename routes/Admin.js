const express = require('express');
const router = express.Router();

const authAdmin = require('../middleware/authAdmin');

const adminCtrl = require('../controllers/Admin');

// admin can delete a user
router.delete('/profile/:userId', authAdmin, adminCtrl.deleteUser);

// admin can delete a post
router.delete('/post/:postId', authAdmin, adminCtrl.deletePost);

// admin can delete a comment
router.delete('/comment/:commentId', authAdmin, adminCtrl.deleteComment); 

// admin can create a forum
// router.post('/', auth, adminCtrl.createForum);

// admin can update a forum
// router.put('/:id', auth, adminCtrl.updateForum);

// admin can delete a forum
// router.delete('/:id', auth, adminCtrl.deleteForum);

module.exports = router;