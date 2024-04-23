const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/:userId', authController.getUserById);

module.exports = router;