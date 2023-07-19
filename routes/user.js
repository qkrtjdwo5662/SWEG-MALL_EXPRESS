const express = require('express');

const { idDuplicateCheck, signUp, login, logout } = require('../controllers/userController');

const router = express.Router();




router.get('/join', (req, res) => {
  res.render('join.ejs');
})
router.post('/duplicate-check', idDuplicateCheck);
router.post('/signup', signUp);
router.get('/join-complete', (req, res) => {
  const user = req.session.uid;
  res.render('join_complete.ejs', { user });
});

router.get('/', (req, res) => {
  res.redirect('/user/login');
})
router.get('/login', (req, res) => {
  res.render('login.ejs');
})
router.post('/login', login);
router.get('/login-success', (req, res) => {
  res.redirect('/');
})
router.get('/mypage', (req, res) => {
  res.render('mypage.ejs');
})


router.get('/logout', logout);

module.exports = router;