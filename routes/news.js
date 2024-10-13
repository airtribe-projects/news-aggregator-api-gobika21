// routes/news.js
const express = require('express');
const { fetchNews } = require('../controller/news');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Fetch news articles based on user preferences
router.get('/', authMiddleware, fetchNews);

module.exports = router;
