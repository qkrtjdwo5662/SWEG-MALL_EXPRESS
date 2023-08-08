const express = require('express');

const {addCart, findCartFromUser} = require("../controllers/userController");
const {findProductFromCookie, findProductFromUserCart, loginCheck} = require('../controllers/productController');
const router = express.Router();



router.get('/cart', loginCheck, findProductFromUserCart);
router.get('/addcart/:model', addCart);

module.exports = router;