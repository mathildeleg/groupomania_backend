const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/Post');

// router.get('/', auth, postCtrl.getAllPosts);
router.post('/forum/:forumId/post', auth, postCtrl.createPost);
// router.get('/byId/:id', auth, postCtrl.getOnePost);
// router.put('/byId/:id', auth, postCtrl.updatePost);
// router.delete('/byId/:id', auth, postCtrl.deletePost);

module.exports = router;