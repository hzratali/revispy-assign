const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { category, markedCategory } = require('../controllers/categoryController');

const router = express.Router();

// Get categories with pagination
router.get('/categories',authMiddleware, category);

// Update interests
router.post('/categories/mark',authMiddleware, markedCategory);

module.exports = router;