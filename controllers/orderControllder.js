require('./mongoConnect');

const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

const { ObjectId } = require('mongodb');

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
      let ogp = 0;
      let odp = 0;
      const data = req.query;
      const models = Object.values(data);
      console.log(data);
      for (let i = 0; i < models.length; i++) {
        const product = await Product.findOne({ model: models[i] });
        
        products.push(product);
        ogp = ogp + parseInt(product.price);
        odp = odp + parseInt(product.price);
      }
      console.log(ogp);
      console.log(odp);

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
      let ogp = 0;
      const data = req.query;
      const models = Object.values(data);
      console.log(data);
      console.log(models);

      for (let i = 0; i < models.length; i++) {
        const product = await Product.findOne({ model: models[i] });
        
        products.push(product);
        ogp = ogp + parseInt(product.price);
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

const getAllOrders = async(req, res) => {
  try{
    const findAllOrders = await Order.find({});
    if(!findAllOrders) res.status(400).json('주문 내역 불러오기 실패');
    console.log(findAllOrders);
    res.render('admin_orderInfo', {orders : findAllOrders});
  }catch(err){
    console.log(err);
    res.status(500).json("오류 발생");
  }
}

const getOrder = async(req, res) => {
  try{
    console.log(req.params.id)
    const findOrder = await Order.findOne({
      _id : new ObjectId(req.params.id)
    })
    if(!findOrder) res.status(400).json("주문 상세 불러오기 실패");
    //console.log(findOrder);
    console.log(findOrder);
    res.render('admin_order_detail.ejs', {order : findOrder});
    
  }catch(err){
    console.log(err);
    res.status(500).json("오류 발생");
  }
}

const confirmOrder = async(req, res) => {
  try{
    console.log(req.params.id);
    // console.log(ObjectId(req.params.id));
    const updateOrder = await Order.updateOne(
      {
        _id : new ObjectId(req.params.id)
      },
      { 
        $set: {
          order_status : "confirm"
        }
      }
    )
    console.log(updateOrder);
    return res.status(200).json("주문 확정 정상처리");
    
  }catch(err){
    console.log(err);
    res.status(500).json("오류 발생");
  }
}

const cancleOrder = async(req, res) => {
  try{
    console.log(req.params.id)
    const deleteOrder = await Order.deleteOne({
      _id : new ObjectId(req.params.id)
    })
    console.log(deleteOrder);
    return res.status(200).json("주문 취소 정상처리");
  }catch(err){
    console.log(err);
    res.status(500).json("오류 발생");
  }
}
module.exports = {
  orderRequest,
  getAllOrders,
  getOrder,
  confirmOrder,
  cancleOrder
}