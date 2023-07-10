const express = require('express');

const { idDuplicateCheck, signUp, login } = require('../controllers/userController');

const router = express.Router();

router.post('/duplicate-check', idDuplicateCheck);
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;