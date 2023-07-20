const express = require('express');

const router = express.Router();

router.get('/list', (req, res) => {
  res.render('list.ejs');


})
router.get('/compare', (req, res) => {
  const product = req.query.product;
  res.render('compare.ejs', { product });
})

router.get('/detail', (req, res) => {
  res.render('detail.ejs');
})
module.exports = router;