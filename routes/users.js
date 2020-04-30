var express = require('express');
var router = express.Router();

/* GET users listining */
router.get('/', (req, res, next) => {
  res.send("respond with a resource")
});

module.exports = router;