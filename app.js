const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const { PORT } = process.env;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser('park'));
app.use(
    session({
        secret: 'park', // 세션 발급 키
        resave: false, // 
        saveUninitialized: true,
        cookie:{
            maxAge: 1000*60*60,
        }
    })
)

//라우터
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin');
// const testRouter = require('./routes/test');

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
// app.use('/test', testRouter);

app.listen(PORT,()=> {
    console.log(`${PORT} 실행 중`);
})