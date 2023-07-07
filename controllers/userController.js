require('./mongoConnect');
const User = require('../models/user');

const signUp = async (req, res) => {
  try{
     const {user_id, user_pw} = req.body;
     const findUser = await User.findOne({user_id: req.body.user_id});
     if(!findUser){
      await User.create({
        user_id,
        user_pw
      });
      console.log(res);
      return res.status(200).json('회원가입 성공');
     }
  }catch (err){
    console.log(err);
    res.status(500).json('회원기입 오류');
  }
};

const login = async (req, res) => {
  try{
    // const {user_id, user_pw} = req.body;
    const findUser = await User.findOne({user_id: req.body.user_id});
    if(!findUser) return res.status(400).json('없는 사용자');
    console.log('로그인 성공');
    return res.status(200).json('로그인 성공');

  }catch (err){
    console.log(err);
    res.status(500).json('로그인 오류');
  }
}

module.exports = {
  signUp,
  login
}
