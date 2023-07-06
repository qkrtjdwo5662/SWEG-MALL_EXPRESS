const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();

app.use(cors());

//라우터
const homeRouter = require('./routes/home');
const testRouter = require('./routes/test');

app.use('/', homeRouter);
app.use('/test', testRouter);

app.listen(PORT,()=> {
    console.log(`${PORT} 실행 중`);
})