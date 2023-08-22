require('./mongoConnect');

const Order = require('../models/order');
const User = require('../models/user');

const orderRequest = async(req, res) => {
  try{
    if(req.session.login){
      const findUser = await User.findOne({
        user_id : req.session.uid
      })
      if(!findUser) return res.status(400).json('회원 오류');
  
      const userInfo = {
        user_id : findUser.user_id,
        user_name : findUser.user_name,
        user_tel : findUser.user_tel,
        user_email : findUser.user_email,
        user_address : findUser.user_address,
        member : true
      }

      let products = [];
      let ogp;
      let odp;
      const data = req.query;
      const models = Object.values(data);
      console.log(data);
      for (let i = 0; i < models.length; i++) {
        const product = await Product.findOne({ model: models[i] });
        
        products.push(product);
        ogp = ogp + product.price;
        odp = odp + product.price;
      }


      const ORDER = await Order.create({
        order_model : models,
        original_price : ogp,
        order_price : odp,
        used_coupon : null,
        order_userInfo : userInfo,
        order_proInfo : products,
      })
      console.log(ORDER);
  
      return res.status(200).json('주문 성공');
    }else{

      const userInfo = {
        user_id : null,
        user_name : null,
        user_tel : null,
        user_email : null,
        user_address : null,
        member : false
      }

      let products = [];
      let ogp;
      const data = req.query;
      const models = Object.values(data);
      console.log(data);


      for (let i = 0; i < models.length; i++) {
        const product = await Product.findOne({ model: models[i] });
        
        products.push(product);
        ogp = ogp + product.price;
      }

      const ORDER = await Order.create({
        order_model : models,
        original_price : ogp,
        order_price : ogp,
        order_userInfo : userInfo,
        order_proInfo : products,
      })
      console.log(ORDER);
      return res.status(200).json('주문 성공');
    }
  }catch(err){
    console.log(err);
    res.status(500).json("오류 발생");
  }
}

module.exports = {
  orderRequest
}