const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const login = req.session.login;
  res.render('index.ejs', {login});
})

module.exports = router;