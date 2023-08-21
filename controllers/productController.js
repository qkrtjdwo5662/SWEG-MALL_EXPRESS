require('./mongoConnect');
const Product = require('../models/product');
const User = require('../models/user');

const init = async(req, res) => {
    try{
        const PRODUCT = await Product.insertMany(
            [
                {
                    category : "refrigerator",
                    name: "FAB28",
                    model: "FAB28RCR5",
                    color: "크림",
                    price: 3350000,
                    img: "/img/list/FAB28-크림.png",
                    count : 2,
                },
                {
                    category : "refrigerator",
                    name: "FAB10",
                    model: "FAB10RRD5",
                    color: "레드",
                    price: 2100000,
                    img: "/img/list/FAB10-레드.png",
                    count : 3,
                },
                {
                    category : "refrigerator",
                    name: "FAB10",
                    model: "FAB10RBL5",
                    color: "블랙",
                    price: 2100000,
                    img: "/img/list/FAB10-블랙.png",
                    count : 1,
                },
                {
                    category : "refrigerator",
                    name: "FAB10",
                    model: "FAB10RCR5",
                    color: "크림",
                    price: 2100000,
                    img: "/img/list/FAB10-크림.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB28",
                    model: "FAB28RBL5",
                    color: "블랙",
                    price: 3350000,
                    img: "/img/list/FAB28-블랙.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB28",
                    model: "FAB28RYW5",
                    color: "옐로우",
                    price: 3350000,
                    img: "/img/list/FAB28-옐로우.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB28",
                    model: "FAB28RDUJ5",
                    color: "유니언잭",
                    price: 3350000,
                    img: "/img/list/FAB28-유니언잭.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB28",
                    model: "FAB28RGR5",
                    color: "파스텔그린",
                    price: 3350000,
                    img: "/img/list/FAB28-파스텔그린.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB5",
                    model: "FAB5RRD5",
                    color: "레드",
                    price: 3350000,
                    img: "/img/list/FAB5-레드.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB5",
                    model: "FAB5RBL5",
                    color: "블랙",
                    price: 3350000,
                    img: "/img/list/FAB5-블랙.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB5",
                    model: "FAB5RCR5",
                    color: "크림",
                    price: 3350000,
                    img: "/img/list/FAB5-크림.png",
                }

            ]
        );
        // console.log(PRODUCT);
        return res.status(200).json('마이그레이션 성공');
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const findProductAll = async (req, res) => {
    try {
        const products = await Product.find({});
        if(!products) res.status(400).json('product list 가져오기 실패');
        // console.log(products);
        res.render('list.ejs', { login: req.session.login, products });
    } catch (err) {
        console.log(err);
        res.status(500).json('오류 발생');
    }
};


const findProductOne = async (req, res) => {
    try{
        const findProduct = await Product.findOne({
            model: req.params.model
        })
        if(!findProduct) return res.status(400).json('해당 상품은 없어요');
        // console.log(findProduct);
        res.render('detail.ejs', { login : req.session.login, product : findProduct});
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}


const findProductFromCookieOrUserDB = async (req, res) => {
    try{
        // 로그인 여부

        // 로그인 했으면 
            // session.id로 findUser
            // findUser.cart(모델명만 담긴)로 findProduct
        if(req.session.login){ // 로그인 여부에 따른 처리
            if(!req.session.uid){
                res.status(400).json("로그인 정보 오류");
            }
            const findUser = await User.findOne({user_id: req.session.uid});
            const cartArr = findUser.cart;
            // console.log(findUser.cart.length);
            // console.log(cartArr);
            if(cartArr.length > 0){
                const map = async() => {
                    let cart = [];
                    
                    cartArr.map(async (item, idx) => {
                        
                        const findProduct = await Product.findOne({
                            model: item
                        })
                        const obj = {
                            name : findProduct.name,
                            model : findProduct.model,
                            color : findProduct.color,
                            img : findProduct.img,
                            price : findProduct.price,
                            count : findProduct.count,
                        };
                        
                        cart.push(obj);
                        
                        if(cart.length === cartArr.length){
                            await res.render('cart.ejs', {login : req.session.login, cart});
                            // console.log(cart.length);
                        }
                    })
                }
                map();
            }else {
                await res.render('cart.ejs', {login : req.session.login, cart:[]});
            }
        }else{
            if(Object.keys(req.cookies).length == 0){
                res.render('cart.ejs', {login : req.session.login, cart:[]});
                return;
            }
            const allCookies = req.cookies;
            const cartCookie = allCookies.cart;
            const cartCookieArr = cartCookie.split('/');
            
            const map = () => {
                let cart = [];
                
                cartCookieArr.map(async (item, idx) => {
                    
                    const findProduct = await Product.findOne({
                        model: item
                    })
                    const obj = {
                        name : findProduct.name,
                        model : findProduct.model,
                        color : findProduct.color,
                        img : findProduct.img,
                        price : findProduct.price,
                        count : findProduct.count,
                    };
                    
                    cart.push(obj);
                    
                    if(cart.length === cartCookieArr.length){
                        res.render('cart.ejs', {login : req.session.login, cart});
                        // console.log(cart);
                    }
                })
            }
            map();
        }
        
        
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}


const compareProducts = async(req, res) => {
    try{
        let products = []
        const data = req.query;
        const models = Object.values(data);
        console.log(models)
        for (let i = 0; i < models.length; i++) {
            const product = await Product.findOne({ model: models[i] });
            // model(값)과 동일한 product를 찾음
            products.push(product);
            //빈배열 추가
        }
        // console.log(products)
        res.render('compare', {login : req.session.login, products});

    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const findProductOrder = async (req,res)=>{
    try{
        if(req.session.login){
            const loginData = req.session.uid

            const findUser = await User.findOne({user_id: loginData})
            console.log(findUser)
            const userInfo = {
                name: findUser.user_name,
                address : findUser.user_address,
                tel : findUser.user_tel,
                emailFirst: findUser.user_email.split('@')[0],
                emailLast: findUser.user_email.split('@')[1],
                coupon : findUser.coupon
            }

            const productOrder = await Product.findOne({ model: req.params.model });
            if (!productOrder) return res.status(400).json('해당 상품은 없어요');
    
            res.render('order.ejs', { login : req.session.login, product : productOrder, user:userInfo});
        }else{
            ///////////////
            // 내가 넣은 부분
            const productOrder = await Product.findOne({ model: req.params.model });
            if (!productOrder) return res.status(400).json('해당 상품은 없어요');
            res.render('order.ejs', { login : req.session.login, product : productOrder, user:null});
            // 내가 넣은 부분
            //////////////
        }

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

///////////////
// 내가 넣은 부분
const findProductOrderMany = async (req, res) => {
    try{    
        // 로그인 여부 판단
        if(req.session.login){ 
            // 로그인 했다면
            // session에 담긴 유저 id를 먼저 찾고 user 정보를 가공해준다.
            const loginData = req.session.uid

            const findUser = await User.findOne({user_id: loginData})
            console.log(findUser);
            const userInfo = {
                name: findUser.user_name,
                address : findUser.user_address,
                tel : findUser.user_tel,
                emailFirst: findUser.user_email.split('@')[0],
                emailLast: findUser.user_email.split('@')[1],
                coupon : findUser.coupon
            }

            // 유저 db에 있는 cart를 변수를 선언하고 옮겨 담아서
            const cartArr = findUser.cart;

            // map 함수를 통해 cart에 담긴 모든 product를 찾는다.
            if(cartArr.length > 0){
                const map = async() => {
                    let productsOrder = [];
                    
                    cartArr.map(async (item, idx) => {
                        
                        const findProduct = await Product.findOne({
                            model: item
                        })
                        const obj = {
                            name : findProduct.name,
                            model : findProduct.model,
                            color : findProduct.color,
                            img : findProduct.img,
                            price : findProduct.price,
                            count : findProduct.count,
                        };
                        
                        productsOrder.push(obj);
                        
                        if(productsOrder.length === cartArr.length){
                            await res.render('order.ejs', {login : req.session.login, product : productsOrder, user:userInfo});
                        }
                    })
                }
                map();
            }else { 
                // product를 제대로 못찾아서 못담을수도 있는 경우도 예외처리를 해준다.
                await res.render('cart.ejs', {login : req.session.login, product:[], user:userInfo});
            }
        }else{ 
            // 비 로그인 유저라면 
            if(Object.keys(req.cookies).length == 0){
                // 쿠키에 정보가 담겼는지 먼저 판단을 하고
                return res.status(400).json("쿠키 정보 없음");
            }

            // 쿠키에 있는 정보를 옮겨 담아서
            const allCookies = req.cookies;
            const cartCookie = allCookies.cart;
            const cartCookieArr = cartCookie.split('/');
            
            // map 함수를 통해 쿠키에 담긴 모든 produc를 찾는다.
            const map = () => {
                let productsOrder = [];
                
                cartCookieArr.map(async (item, idx) => {
                    
                    const findProduct = await Product.findOne({
                        model: item
                    })
                    const obj = {
                        name : findProduct.name,
                        model : findProduct.model,
                        color : findProduct.color,
                        img : findProduct.img,
                        price : findProduct.price,
                        count : findProduct.count,
                    };
                    
                    productsOrder.push(obj);
                    
                    if(productsOrder.length === cartCookieArr.length){
                        res.render('order.ejs', {login : req.session.login, product : productsOrder,  user:null});
                    }
                })
            }
            map();
        
        }
    
    }catch(err){
        console.log(err);
        res.status(500).json('오류 발생');
    }
}
// 내가 넣은 부분
//////////////

// -----------------------------------------------------------------
// admin

const getAllProducts = async(req, res) => {
    try{
        let products = [];

        const findAllProducts = await Product.find({});

        findAllProducts.map((findProduct, idx) =>{
            let info = {};
            info.category = findProduct.category;
            info.name = findProduct.name;
            info.model = findProduct.model;
            info.color = findProduct.color;
            info.price = findProduct.price;
            info.img = findProduct.img;
            info.count = findProduct.count;

            products.push(info);
            if(idx == findAllProducts.length-1){
                res.render('admin_proInfo.ejs', { products })
            }
    })
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
    
}

const getProduct = async(req, res) => {
    try{
        const selectedProduct = await Product.findOne({
            model : req.params.model
        });
        if(!selectedProduct) return res.status(200).json("해당 상품은 없어요");
    
        res.render("admin_products_modify", {selectedProduct});
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
    
}

const registerProduct = async(req, res) => {
    try{
        const {category, name, model, color, price, count} = req.body;

        console.log(req.file);
        const PRODUCT = await Product.create({
            category,
            name,
            model,
            color,
            price,
            img : req.file ? "/uploads/" + req.file.filename : null,
            count
        });
        console.log(PRODUCT);
        return res.redirect('/admin/products');
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
    
}

const deleteProduct = async(req, res) => {
    try{
        const deleteProductOne = await Product.deleteOne({
            model : req.params.model,
        })
        if(!deleteProductOne) return res.status(400).json("삭제 오류");
        console.log(deleteProductOne);
        return res.status(200).json("삭제 성공");

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const modifyProduct = async(req, res) => {
    try{
        const {category, name, model, color, price, count} = req.body;
        const updateProduct = await Product.updateOne(
            {
                model : req.params.model,
            },
            {
                $set: {
                    category : category,
                    name : name,
                    model : model,
                    color : color,
                    price : price,
                    img : req.file ? "/uploads/" + req.file.filename : null,
                    count : count
                }
            }
        )
        console.log(updateProduct);
        return res.redirect('/admin/products');

    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}
module.exports = {
    init, 
    findProductOne, 
    findProductFromCookieOrUserDB, 
    findProductAll, 
    compareProducts, 
    findProductOrder, 
    findProductOrderMany,
    getAllProducts, 
    getProduct, 
    registerProduct,
    deleteProduct,
    modifyProduct
};