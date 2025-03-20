const express = require('express');
const { getUserBooks } = require('../controllers/userController');

const router = express.Router();

router.get('/:userId/books', getUserBooks);

module.exports = router;
