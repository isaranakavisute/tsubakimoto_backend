const express = require('express');
const router = express.Router();
const formidable = require('formidable');
router.post('/', async function(req, res, next)
{
 //console.log("username=",req.body.username,",password=",req.body.password);
 //connect to mysql database
 const db = require('../db');
 const config = require('../config');
 const helper = require('../helper');
 //sql = "select * from user where usr='" + req.body.usr + "' and pwd='" + req.body.pwd + "' and access='" + req.body.access  + "'";
 //console.log(sql);
 //var results = await db.query(sql);
 //console.log(results);
 //console.log(results.length);

 var form = new formidable.IncomingForm();
 form.parse(req, function (err, fields, files) {
  var oldpath = files.filetoupload.filepath;
  var newpath = 'uploaded_files/' + files.filetoupload.originalFilename;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
//    res.write('File uploaded and moved!');
//    res.end();
    res.writeHead(200, {'Content-Type': 'application/json'});
      res.write
      (
       JSON.stringify
        (
         {
          "status":true,
          "upload_excel":
           {
            "result": "pass"
           }
          }
        )
       );
       res.end();
  });
  });


 if (1)
 {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write
  (
   JSON.stringify
    (
     {
      "status":true,
      "upload_excel":
       {
//        "username": req.body.usr,
//        "password": req.body.pwd,
//        "access": req.body.access,
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
      "upload_excel":
      {
//       "username": req.body.usr,
//       "password": req.body.pwd,
//       "access": req.body.access,
       "result": "fail"
      }
     }
    )
   );
   res.end();
}

});
module.exports = router;
