const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/Comment');

router.get('/forum/:forumId/post/:postId/comment', auth, commentCtrl.getAllComments);
router.post('/forum/:forumId/post/:id/comment', auth, commentCtrl.commentPost);
router.get('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.getOneComment);
router.put('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.updateComment);
router.delete('/forum/:forumId/post/:id/comment/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;