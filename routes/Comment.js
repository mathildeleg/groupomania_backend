const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/Comment');

// user can see the comments
router.get('/forum/:forumId/post/:postId/comment', auth, commentCtrl.getAllComments);
// user can comment a post
router.post('/forum/:forumId/post/:id/comment', auth, commentCtrl.commentPost);
// user can see one comment
router.get('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.getOneComment);
// user can update their comment(s)
router.put('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.updateComment);
// user can delete their comment(s)
router.delete('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;