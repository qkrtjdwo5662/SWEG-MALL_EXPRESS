require('./mongoConnect');
const User = require('../models/user');
const crypto =  require("crypto");
const util = require("util");

const idDuplicateCheck = async (req, res) => {
    try{
        const findUser = await User.findOne({user_id : req.body.user_id});
        if(!findUser){
            return res.status(200).json('중복 없음 확인');
        }
        return res.status(409).json('중복 아이디');
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString("base64");
}
const createHashedPassword = async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 5555, 64, "sha512");
    const hashedPassword = key.toString("base64");

    return { hashedPassword, salt };
};

const signUp = async (req, res) => {
  try{
     const {user_name, user_gender, user_birth, user_id, user_pw, user_tel, user_email, user_address} = req.body;
     const {hashedPassword, salt} = await createHashedPassword(user_pw);

     const USER = await User.create({
         user_name,
         user_gender,
         user_birth,
         user_id,
         user_pw: hashedPassword,
         user_tel,
         user_email,
         user_address,
         salt: salt,
         coupon : [ "join congraturation"]
      });
      req.session.login = true; // 로그인 유무
      req.session.uid = user_id; 
      req.session.user = USER;

      return res.status(200).json('회원가입 성공');

  }catch (err){
    console.log(err);
    res.status(500).json('회원기입 오류');
  }
};

const verifyPW = async (pw, user_salt, user_pw) => {
    const key = await pbkdf2Promise(pw, user_salt, 5555, 64, "sha512");
    const hashedPassword = key.toString("base64");

    if(hashedPassword === user_pw) return true;
    return false;
}

const login = async (req, res) => {
  try{
    const {user_id, user_pw} = req.body;
    const findUser = await User.findOne({user_id: req.body.user_id});
    if(!findUser) return res.status(400).json('없는 사용자');
    const verified = await verifyPW(user_pw, findUser.salt, findUser.user_pw);
    if(user_id !== findUser.user_id || !verified) return res.status(401).json('회원 정보 오류');
    
    req.session.login = true; // 로그인 유무
    req.session.uid = user_id; 
    req.session.user = findUser;

    return res.status(200).json('로그인 성공');

  }catch (err){
    console.log(err);
    res.status(500).json('로그인 오류');
  }
}

const loginCheck = async(req, res, next) => { // 로그인 여부 확인 미들웨어
    if(req.session.login){
        next();
    } else{
        return res.render('alert');
    }
}

const logout = async(req, res) => {
  req.session.destroy((err) => {
    if(err) throw err;
    res.redirect('/');
  })
}
module.exports = {
    idDuplicateCheck,
    signUp,
    login,
    logout,
    loginCheck
}
