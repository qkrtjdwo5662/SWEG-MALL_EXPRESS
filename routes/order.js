const express = require('express');

const {addCart, loginCheck , addCoupon} = require("../controllers/userController");

const {findProductFromCookieOrUserDB, findProductOrder} = require('../controllers/productController');
const router = express.Router();



router.get('/cart', findProductFromCookieOrUserDB);

router.get('/addcart/:model', addCart);

router.get('/order/:model', findProductOrder)

router.get('/coupon', loginCheck, (req, res) => {
  res.render('coupon', {login:req.session.login});
});

router.post('/coupon/:couponid', loginCheck, addCoupon);

router.get('/order', (req, res) => {
  res.render('test.ejs');
  //로그인 여부 확인

  // 로그인 했으면 
  // user.cart -> products
  // ejs를 띄운다.

  // 로그인 안했으면
  // cookie에 담긴 cart -> products
  // ejs를 띄운다.
})
module.exports = router;