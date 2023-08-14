const express = require('express');

const{ getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin_index.ejs');
})

router.get('/users', getAllUsers);

router.get('/products', (req, res) => {
  res.render('admin_proInfo.ejs');
})

module.exports = router;