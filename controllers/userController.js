require('./mongoConnect');
const User = require('../models/user');

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

const signUp = async (req, res) => {
  try{
     const {user_name, user_gender, user_birth, user_id, user_pw, user_tel, user_email, user_address} = req.body;

     await User.create({
         user_name,
         user_gender,
         user_birth,
         user_id,
         user_pw,
         user_tel,
         user_email,
         user_address
      });

      console.log(res);
      return res.status(200).json('회원가입 성공');
  }catch (err){
    console.log(err);
    res.status(500).json('회원기입 오류');
  }
};


const login = async (req, res) => {
  try{
    const {user_id, user_pw} = req.body;
    const findUser = await User.findOne({user_id: req.body.user_id});
    if(!findUser) return res.status(400).json('없는 사용자');
    if(user_id !== findUser.user_id || user_pw !== findUser.user_pw) return res.status(401).json('회원 정보 오류');
    // res.cookie('user', findUser, {
    //     httpOnly: true,
    //     signed: true,
    // });
    // console.log(req.cookies);
    return res.status(200).json(findUser);

  }catch (err){
    console.log(err);
    res.status(500).json('로그인 오류');
  }
}

module.exports = {
  idDuplicateCheck,
  signUp,
  login
}
