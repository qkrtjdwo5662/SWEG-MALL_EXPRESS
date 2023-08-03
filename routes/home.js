const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const login = req.session.login;
  // console.log(req.cookies); // 서명 안된 쿠키
  // console.log(req.signedCookies); // 서명 된 쿠키
  res.render('index.ejs', {login});
})

module.exports = router;