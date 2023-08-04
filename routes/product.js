const express = require('express');

const {init, findProductOne,findProductAll} = require('../controllers/productController');
const router = express.Router();

router.get('/migration', init);

router.get('/list', findProductAll);

router.get('/compare', (req, res) => {
  const product = req.query.product;
  res.render('compare.ejs', { product, login : req.session.login });
})

router.get('/detail/:model', findProductOne);

module.exports = router;