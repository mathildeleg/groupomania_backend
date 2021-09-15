const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/Post');

// router.get('/forum/:forumId/post', auth, postCtrl.getAllPosts);
router.post('/forum/:forumId/post', auth, postCtrl.createPost);
router.get('/forum/:forumId/post/byId/:id', auth, postCtrl.getOnePost);
router.put('/forum/:forumId/post/byId/:id', auth, postCtrl.updatePost);
router.delete('/forum/:forumId/post/byId/:id', auth, postCtrl.deletePost);

module.exports = router;