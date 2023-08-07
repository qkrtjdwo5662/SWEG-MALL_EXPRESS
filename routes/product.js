const express = require('express');

const {init, findProductOne,findProductAll, compareProducts} = require('../controllers/productController');
const router = express.Router();

router.get('/migration', init);

router.get('/list', findProductAll);

router.get('/compare', compareProducts)

router.get('/detail/:model', findProductOne);

module.exports = router;