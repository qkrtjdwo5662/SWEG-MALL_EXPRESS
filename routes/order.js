const express = require('express');

const {addCart, loginCheck } = require("../controllers/userController");

const {findProductFromCookieOrUserDB,findProductOrder} = require('../controllers/productController');
const router = express.Router();



router.get('/cart', findProductFromCookieOrUserDB);
router.get('/addcart/:model', addCart);
router.get('/order/:model', findProductOrder, loginCheck)
router.get('/coupon', (req, res) => {
  res.render('coupon', {login:req.session.login});
});

module.exports = router;