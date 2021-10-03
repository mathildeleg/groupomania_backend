const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/Post');

router.get('/forum/:forumId/post', auth, postCtrl.getAllPosts);
router.post('/forum/:forumId/post', auth, multer, postCtrl.createPost);
router.get('/forum/:forumId/post/:postId', auth, postCtrl.getOnePost);
router.put('/forum/:forumId/post/:postId', auth, postCtrl.updatePost);
router.delete('/forum/:forumId/post/:postId', auth, postCtrl.deletePost);

router.post('/forum/:forumId/post/:postId/like', auth, postCtrl.likePost);

module.exports = router;