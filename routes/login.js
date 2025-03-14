const express = require('express');
const router = express.Router();
router.post('/', async function(req, res, next)
{
 console.log("username=",req.body.username,",password=",req.body.password);

 //connect to mysql database
 const db = require('../db');
 const config = require('../config');
 const helper = require('../helper');
 sql = "select * from username_password where myusername='" + req.body.username + "' and mypassword='" + req.body.password + "'";
 console.log(sql);
 var results = await db.query(sql);
 console.log(results);
 console.log(results.length);
 if (results.length)
 {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write
  (
   JSON.stringify
    (
     {
      "status":true,
      "login":
       {
        "username": req.body.username,
        "password": req.body.password,
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
      "login":
      {
       "username": req.body.username,
       "password": req.body.password,
       "result": "fail"
      }
     }
    )
   );
   res.end();
}

});
module.exports = router;