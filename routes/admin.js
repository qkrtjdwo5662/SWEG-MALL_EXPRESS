const express = require('express');

const{ getAllUsers, getUser, adminCheck, deleteUser} = require('../controllers/userController');
const{getAllProducts, getProduct, registerProduct, deleteProduct, modifyProduct} = require('../controllers/productController');

const multer = require('multer');
const fs = require('fs');

const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1028 * 2,
};

const upload = multer({ storage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const router = express.Router();


// router.get('/', adminCheck ,(req, res) => {
//   res.render('admin_index.ejs');
// })

// router.get('/users', adminCheck ,getAllUsers);
// router.get('/users/detail/:id', adminCheck ,getUser);
// router.post('/users/delete/:id',adminCheck, deleteUser);

// router.get('/products',adminCheck ,getAllProducts);
// router.get('/products/register',adminCheck,  (req, res) => {
//   res.render('admin_products_register');
// })
// router.post('/products/register',adminCheck, upload.single('img'), registerProduct);

// router.get('/products/modify/:model',adminCheck ,getProduct);

router.get('/',(req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users' ,getAllUsers);
router.get('/users/detail/:id' ,getUser);
router.post('/users/delete/:id', deleteUser);

router.get('/products' ,getAllProducts);
router.get('/products/register',  (req, res) => {
  res.render('admin_products_register');
})
router.post('/products/register', upload.single('img'), registerProduct);

router.get('/products/modify/:model' ,getProduct);
router.post('/products/modify/:model', upload.single('img'), modifyProduct);

router.post('/products/delete/:model', deleteProduct);
module.exports = router;