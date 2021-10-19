const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const adminCtrl = require('../controllers/Admin');

// admin can delete a user
// router.delete('', auth, adminCtrl.deleteUser); ?

// admin can delete a post
// router.delete('/forum/:forumId/post/:postId', auth, adminCtrl.deletePost); 

// admin can delete a comment
router.delete('/comment/:commentId', auth, adminCtrl.deleteComment); 

// admin can create a forum
// router.post('/', auth, adminCtrl.createForum);

// admin can update a forum
// router.put('/:id', auth, adminCtrl.updateForum);

// admin can delete a forum
// router.delete('/:id', auth, adminCtrl.deleteForum);

module.exports = router;