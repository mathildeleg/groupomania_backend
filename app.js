const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const forumRoutes = require('./routes/Forum');
const postRoutes = require('./routes/Post');
const commentRoutes = require('./routes/Comment');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

module.exports = app;
