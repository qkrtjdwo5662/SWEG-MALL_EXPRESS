require('./mongoConnect');
const { query } = require('express');
const Product = require('../models/product');

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
                },
                {
                    category : "refrigerator",
                    name: "FAB10",
                    model: "FAB10RRD5",
                    color: "레드",
                    price: 2100000,
                    img: "/img/list/FAB10-레드.png",
                },
                {
                    category : "refrigerator",
                    name: "FAB10",
                    model: "FAB10RBL5",
                    color: "블랙",
                    price: 2100000,
                    img: "/img/list/FAB10-블랙.png",
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
        console.log(PRODUCT);
        return res.status(200).json('마이그레이션 성공');
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const findProductOne = async (req, res) => {
    try{
        const findProduct = await Product.findOne({
            model: req.params.model
        })
        if(!findProduct) return res.status(400).json('해당 상품은 없어요');
        console.log(findProduct);
        res.render('detail.ejs', { login : req.session.login, product : findProduct});
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const compareProducts = async(req, res) => {
    try{
        const data = req.query;
    
        const key = Object.keys(data);
        const len = Object.keys(data).length;
        let products = [];

        for(let i=0; i<len; i++){
            const product = await Product.findOne({
                model: data[key[i]],
            })
            products.push(product);
        }
        console.log(products);
        res.render('compare', {login : req.session.login, products});

    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

module.exports = {init, findProductOne, compareProducts};