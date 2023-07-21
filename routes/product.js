const express = require('express');

const {init} = require('../controllers/productController');
const router = express.Router();

router.get('/migration', init);

router.get('/list', (req, res) => {
  
  res.render('list.ejs', { login : req.session.login});


})
router.get('/compare', (req, res) => {
  const product = req.query.product;
  res.render('compare.ejs', { product, login : req.session.login });
})

router.get('/detail', (req, res) => {
  res.render('detail.ejs', { login : req.session.login});
})
module.exports = router;