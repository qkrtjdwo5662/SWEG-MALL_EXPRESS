const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();

app.use(cors());

app.use('/', (req, res) => {
  res.send("하이");
})

app.listen(PORT,()=> {
    console.log(`${PORT} 실행 중`);
})