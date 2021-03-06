const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
require('dotenv/config');

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const forumRoutes = require('./routes/Forum');
const postRoutes = require('./routes/Post');
const commentRoutes = require('./routes/Comment');
const adminRoutes = require('./routes/Admin');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', adminRoutes);

module.exports = app;
