const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

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
// const testRouter = require('./routes/test');

app.use('/', homeRouter);
app.use('/user', userRouter);
// app.use('/test', testRouter);

app.listen(PORT,()=> {
    console.log(`${PORT} 실행 중`);
})