const express = require('express');
const router = express.Router();
const formidable = require('formidable');
var fs = require('fs');
var Excel = require('exceljs');
var lineReader = require('line-reader');
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
  //fs.rename(oldpath, newpath, function (err) {
   fs.rename(oldpath, 'uploaded_files/sample_update_master_ptuc_other_dist.xlsx'  /*newpath*/, function (err) {
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
/*
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
*/

else
    {
       var wb = new Excel.Workbook();
       wb.xlsx.readFile('uploaded_files/sample_update_master_ptuc_other_dist.xlsx').then(function(){
       wb.csv.writeFile('uploaded_files/sample_update_master_ptuc_other_dist.csv')
       .then(async function() {
       console.log("saved csv...done");
       var line_cnt=0;
       //sql = "delete from master_ptuc_other_dist";
       //console.log(sql);
       //await db.query(sql);
       lineReader.eachLine('uploaded_files/sample_update_master_ptuc_other_dist.csv', async function(line, last) {
       line_cnt++;
       if (line_cnt >= 17)
       {
        var arr = line.split(",");
        for(var i=0;i<arr.length;i++) {
         if (arr[i]=="" || arr[i].indexOf('sharedFormula')!=-1 || arr[i].indexOf('#DIV')!=-1 || arr[i].indexOf('#VALUE')!=-1 || arr[i].indexOf('undefined')!=-1  ) arr[i] = "blank";
         var token_number = i + 1;
         console.log("token #"+ token_number + ") " + arr[i]);
        }
        console.log("---");

        //sql="insert into master_ptuc_other_dist(category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail)";
        //master_tsubakimoto
        sql="insert into master_tsubakimoto(category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail)";
        sql += " values ('";
        sql += arr[0];
        sql += "','";
        sql += arr[1];
        sql += "','";
        sql += arr[2];
        sql += "','";
        sql += arr[3];
        sql += "','";
        sql += arr[4];
        sql += "','";
        sql += arr[5];
        sql += "','";
        sql += arr[6];
        sql += "','";
        sql += arr[7];
        sql += "','";
        sql += arr[8];
        sql += "','";
        sql += arr[9];
        sql += "','";
        sql += arr[10];
        sql += "','";
        sql += arr[11];
        sql += "','";
        sql += arr[12];
        sql += "','";
        sql += arr[13];
        sql += "','";
        sql += arr[14];
        sql += "','";
        sql += arr[15];
        sql += "','";
        sql += arr[16];
        sql += "','";
        sql += arr[17];
        sql += "','";
        sql += arr[18];
        sql += "','";
        sql += arr[19];
        sql += "','";
        sql += arr[20];
        sql += "','";
        sql += arr[21];
        sql += "','";
        sql += arr[22];
        sql += "','";
        sql += arr[23];
        sql += "','";
        sql += arr[24];
        sql += "','";
        sql += arr[25];
        sql += "','";
        sql += arr[26];
        sql += "','";
        sql += arr[27];
        sql += "','";
        sql += arr[28];
        sql += "','";
        sql += arr[29];
        sql += "','";
        sql += arr[30];
        sql += "')";
        console.log(sql);
        await db.query(sql);
        }
       if(last){
       }
       });
       });

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
      });
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
