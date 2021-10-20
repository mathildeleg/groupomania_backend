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

// admin can fetch all profiles
router.get('/profile', authAdmin, adminCtrl.getAllProfiles);

module.exports = router;