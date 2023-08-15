const express = require('express');

const{ getAllUsers, getUser, adminCheck, deleteUser} = require('../controllers/userController');
const{getAllProducts, getProduct, registerProduct} = require('../controllers/productController');

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


router.get('/', adminCheck ,(req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users', adminCheck ,getAllUsers);
router.get('/users/detail/:id', adminCheck ,getUser);
router.post('/users/delete/:id',adminCheck, deleteUser);

router.get('/products',adminCheck ,getAllProducts);
router.get('/products/register', (req, res) => {
  res.render('admin_products_register');
})
router.post('/products/register',adminCheck, upload.single('img'), registerProduct);

router.get('/products/modify/:model',adminCheck ,getProduct);
module.exports = router;