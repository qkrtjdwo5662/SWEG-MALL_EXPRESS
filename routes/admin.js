const express = require('express');

const{ getAllUsers, getUser } = require('../controllers/userController');
const{getAllProducts, getProduct} = require('../controllers/productController');

const multer = require('multer');
const fs = require('fs');

const dir = '../public/img';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});

const limits = {
  fileSize: 1024 * 1028 * 2,
};

const upload = multer({ storage, limits });

const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users', getAllUsers);
router.get('/users/detail/:id', getUser);

router.get('/products', getAllProducts);
router.get('/products/register', (req, res) => {
  res.render('admin_products_register');
})
router.get('/products/modify/:model', getProduct);
module.exports = router;