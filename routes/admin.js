const express = require('express');

const{ getAllUsers } = require('../controllers/userController');
const{getAllProducts} = require('../controllers/productController');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users', getAllUsers);

router.get('/products', getAllProducts);

module.exports = router;