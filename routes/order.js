const express = require('express');

const {findProductFromCookie} = require('../controllers/productController');
const router = express.Router();

router.get('/cart', findProductFromCookie);

module.exports = router;