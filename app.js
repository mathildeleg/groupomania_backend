const express = require('express');
const { PrismaClient } = require('@prisma/client')

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

module.exports = app;

