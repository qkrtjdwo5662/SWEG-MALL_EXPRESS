const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = 4000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser('park'));

//라우터
const homeRouter = require('./routes/home');
const testRouter = require('./routes/test');
const userRouter = require('./routes/user');

app.use('/', homeRouter);
app.use('/test', testRouter);
app.use('/user', userRouter);


app.listen(PORT,()=> {
    console.log(`${PORT} 실행 중`);
})