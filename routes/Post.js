const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/Post');

// router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
// router.get('/byId/:id', postCtrl.getOnePost);
// router.put('/byId/:id', postCtrl.updatePost);
// router.delete('/byId/:id', postCtrl.deletePost);

module.exports = router;