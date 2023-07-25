const express = require('express');

const {init, findProductOne, compareProducts} = require('../controllers/productController');
const router = express.Router();

router.get('/migration', init);

router.get('/list', (req, res) => {
  
  res.render('list.ejs', { login : req.session.login});


})
router.get('/compare', compareProducts)

router.get('/detail/:model', findProductOne);
module.exports = router;