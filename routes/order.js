const express = require('express');

const router = express.Router();

router.get('/cart', (req, res) => {
  const login = req.session.login;
  res.render('cart.ejs', {login});
})

module.exports = router;