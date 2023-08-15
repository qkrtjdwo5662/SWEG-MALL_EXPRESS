const express = require('express');

const{ getAllUsers, getUser } = require('../controllers/userController');
const{getAllProducts} = require('../controllers/productController');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users', getAllUsers);
router.get('/users/detail/:id', getUser);

router.get('/products', getAllProducts);

module.exports = router;