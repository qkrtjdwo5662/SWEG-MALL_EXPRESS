const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('test 라우터 입니다.');
})

module.exports = router;