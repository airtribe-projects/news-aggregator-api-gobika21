// routes/preferences.js
const express = require('express');
const { getPreferences, updatePreferences } = require('../controller/preferences');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getPreferences);
router.put('/', authMiddleware, updatePreferences);

module.exports = router;
