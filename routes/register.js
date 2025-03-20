const express = require('express');
const router = express.Router();
router.post('/', async function(req, res, next) 
{
console.log(
"username=",
req.body.username,
",",
"password=",
req.body.password,
",",
"email=",
req.body.email
);

//connect to mysql database
const db = require('../db');
const config = require('../config');
const helper = require('../helper');
var sql = "insert into user(usr,pwd,access) values ('" + req.body.usr + "','" + req.body.pwd + "','" + req.body.access + "')";
console.log(sql);
await db.query(sql);
sql = "select * from user where usr='" + req.body.usr + "' and pwd='" + req.body.pwd + "' and access='" + req.body.access + "'" ;
console.log(sql);
const rows = await db.query(sql);
console.log(rows);
console.log(rows.length)
if (rows.length)
  {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write
    (
        JSON.stringify
        (
             {

                "status":true, 
                "register":
                 {
                  "usr": req.body.usr,
                  "pwd": req.body.pwd,
                  "access": req.body.access,
                  "result": "pass"
                 }

             }
        )
    );
    res.end();
  }
else
  {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write
    (
        JSON.stringify
        (
            {

                "status":true, 
                "register":
                 {
                  "usr": req.body.usr,
                  "pwd": req.body.pwd,
                  "access": req.body.access,
                  "result": "fail"
                 }

             }

        )
    );
    res.end();
  }

});
module.exports = router;
