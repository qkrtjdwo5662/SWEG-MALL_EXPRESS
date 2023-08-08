const express = require('express');

const {addCart} = require("../controllers/userController");
const {findProductFromCookieOrUserDB} = require('../controllers/productController');
const router = express.Router();



router.get('/cart', findProductFromCookieOrUserDB);
router.get('/addcart/:model', addCart);
router.get('/coupon', (req, res) => {
  res.render('coupon', {login:req.session.login});
});

module.exports = router;