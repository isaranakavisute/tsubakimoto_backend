const express = require('express');
const router = express.Router();
const formidable = require('formidable');
var fs = require('fs');
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
 console.log("entering code1");
 var form = new formidable.IncomingForm();
 form.parse(req, function (err, fields, files) {
  console.log("entering code2");
  console.log(files);
  console.log(files.file);
  console.log(files.file[0].filepath);
  var oldpath = files.file[0].filepath;
  console.log(oldpath);
  //var newpath = '/home/ubuntu/tsubakimoto_backend/uploaded_files/' + files.file[0].originalFilename;
  //var newpath = '/home/ubuntu/tsubakimoto_backend/uploaded_files/' + 'Sample_user_data_Tsubakimoto.xlsx';  
  var newpath = 'uploaded_files/' + files.file[0].originalFilename.replace(/ /g, '_');  
  console.log(newpath);
  fs.rename(oldpath, newpath, function (err) {
    if (err) 
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
            "result": "fail",
            "oldpath": oldpath,
            "newpath": newpath
           }
          }
        )
       );
       res.end();
    }
//    res.write('File uploaded and moved!');
//    res.end();
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
            "result": "pass",
            "oldpath": oldpath,
            "newpath": newpath
           }
          }
        )
       );
       res.end();
     }
  });
  });


// if (1)
 //{
  //res.writeHead(200, {'Content-Type': 'application/json'});
  //res.write
  //(
   //JSON.stringify
    //(
     //{
      //"status":true,
      //"upload_excel":
       //{
//        "username": req.body.usr,
//        "password": req.body.pwd,
//        "access": req.body.access,
        //"result": "pass"
       //}
      //}
    //)
   //);
  // res.end();
//}
//else
//{
  // res.writeHead(200, {'Content-Type': 'application/json'});
   //res.write
   //(
    //JSON.stringify
    //(
     //{
      //"status":true,
      //"upload_excel":
      //{
//       "username": req.body.usr,
//       "password": req.body.pwd,
//       "access": req.body.access,
       //"result": "fail"
      //}
     //}
   // )
   //);
   //res.end();
//}

});
module.exports = router;
