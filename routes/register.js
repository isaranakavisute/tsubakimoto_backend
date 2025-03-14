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
var sql = "insert into username_password(myusername,mypassword,myemail) values ('" + req.body.username + "','" + req.body.password + "','" + req.body.email + "')";
console.log(sql);
await db.query(sql);
sql = "select * from username_password where myusername='" + req.body.username + "'";
console.log(sql);
const rows = await db.query(sql);
//const data = helper.emptyOrRows(rows);
//res.json(data);

if (rows)
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
                  "username": req.body.username,
                  "password": req.body.password,
                  "email": req.body.email,
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
                   "username": req.body.username,
                   "password": req.body.password,
                    "email": req.body.email,
                   "result": "fail"
                  }

             }
        )
    );
    res.end();
  }

});
module.exports = router;