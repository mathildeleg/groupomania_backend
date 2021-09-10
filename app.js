const express = require('express');
// const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const userRoutes = require('./routes/User');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.get('/', (req, res, next) => {
    res.send('I am working!');
})

app.use(express.json());
// app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;