const express = require('express');
const router = express.Router();
router.post('/', async function(req, res, next) 
{
console.log("username=",req.body.username,",password=",req.body.password);
if ((req.body.username=="isara") && (req.body.password=="1234"))
  {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write
    (
        JSON.stringify
        (
             {
              "data": 
               {
                "status":true, 
                "login":
                 {
                  "username": req.body.username,
                  "password": req.body.password,
                  "result": "pass"
                 }
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
              "data": 
               {
                "status":true, 
                "login":
                 {
                  "username": req.body.username,
                  "password": req.body.password,
                  "result": "fail"
                 }
               }
             }
        )
    );
    res.end();
  }

});
module.exports = router;