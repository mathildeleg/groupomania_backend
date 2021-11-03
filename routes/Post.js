const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/Post');

// user can see all the posts in a forum
router.get('/forum/:forumId/post', auth, postCtrl.getAllPosts);
// user can create a post
router.post('/forum/:forumId/post', auth, postCtrl.createPost);
// user can see one post
router.get('/forum/:forumId/post/:postId', auth, postCtrl.getOnePost);
// user can update their post(s)
router.put('/forum/:forumId/post/:postId', auth, postCtrl.updatePost);
// user can delete their post(s)
router.delete('/forum/:forumId/post/:postId', auth, postCtrl.deletePost);


// user can like a post (but not their own)
router.post('/forum/:forumId/post/:postId/like', auth, postCtrl.likePost);
// check if user has already liked the post or not
router.get('/forum/:forumId/post/:postId/like', auth, postCtrl.hasLiked);

module.exports = router;