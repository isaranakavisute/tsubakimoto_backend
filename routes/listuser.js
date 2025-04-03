const express = require('express');
const router = express.Router();
router.post('/', async function(req, res, next) 
{


//connect to mysql database
const db = require('../db');
const config = require('../config');
const helper = require('../helper');
sql = "select * from user";
console.log(sql);
var results = await db.query(sql);
console.log(results);
//console.log(results.length);
res.json(results);
});
module.exports = router;
