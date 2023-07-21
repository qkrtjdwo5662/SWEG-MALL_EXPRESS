const express = require('express');

const { idDuplicateCheck, signUp, login, logout } = require('../controllers/userController');

const router = express.Router();



// ----- 회원가입 관련 ------ 
router.get('/join', (req, res) => { // 회원가입 페이지
  const login = req.session.login;
  if(login) return res.redirect('/');
  res.render('join.ejs', {login : req.session.login });
})

router.post('/duplicate-check', idDuplicateCheck); // 아이디 중복 체크
router.post('/signup', signUp); // 회원가입 요청
router.get('/join-complete', (req, res) => { // 회원가입 후
  const user = req.session.user;
  if(user === undefined){
    return res.render('alert');
  }

  const user_id = user.user_id;
  const user_name = user.user_name;
  const user_email = user.user_email;
  res.render('join_complete.ejs', { user_id, user_name, user_email, login : req.session.login  });
});

// ----- 로그인 관련 ------
router.get('/', (req, res) => {
  res.redirect('/user/login');
})
router.get('/login', (req, res) => {
  const login = req.session.login;
  if(login) return res.redirect('/');
  res.render('login.ejs', {login});
})
router.post('/login', login);
router.get('/login-success', (req, res) => {
  res.redirect('/');
})


router.get('/mypage', (req, res) => {
  const user = req.session.user;
  if(user === undefined){
    return res.render('alert');
  }

  res.render('mypage.ejs', {login : req.session.login });
})


router.get('/logout', logout);

module.exports = router;