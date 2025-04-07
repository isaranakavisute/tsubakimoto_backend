const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const xlsx = require('xlsx');
var lineReader = require('line-reader');
var Excel = require('exceljs');
var fs = require('fs');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

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
  fs.rename(oldpath, 'uploaded_files/sample_update_master_akt_format_kabelschlepp.xlsx'  /*newpath*/, function (err) {
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
      //res.writeHead(200, {'Content-Type': 'application/json'});
      //res.write
      //(
       //JSON.stringify
        //(
         //{
          //"status":true,
          //"upload_excel":
           //{
            //"result": "pass",
            //"oldpath": oldpath,
            //"newpath": newpath
           //}
          //}
        //)
       //);
       //res.end();


       //const workbook = xlsx.readFile('uploaded_files/sample_update_master_akt_format_kabelschlepp.xlsx');
       //const worksheet = workbook.Sheets[workbook.SheetNames[0]];
       //const rows = worksheet.getRows();
       //for (let i = 0; i < rows.length; i++) {
        //const row = rows[i];
        //console.log(row); }
       var wb = new Excel.Workbook();
       wb.xlsx.readFile('uploaded_files/sample_update_master_akt_format_kabelschlepp.xlsx').then(function(){
       wb.csv.writeFile('uploaded_files/sample_update_master_akt_format_kabelschlepp.csv' )
       .then(async function() {
       console.log("saved csv...done");
       var line_cnt=0;
       sql = "delete from master_akt_format_kabelschlepp";
       console.log(sql);
       await db.query(sql);
       lineReader.eachLine('uploaded_files/sample_update_master_akt_format_kabelschlepp.csv', async function(line, last) {
       //await sleep(10000); // sleep for 10 seconds
       line_cnt++;
       if ((line_cnt >= 17) /*&& (line_cnt <= 100)*/)
       {


        var arr = line.split(",");
        for(var i=0;i<arr.length;i++) {
         if (arr[i]=="" || arr[i].indexOf('sharedFormula')!=-1) arr[i] = "blank";
         var token_number = i + 1;
         console.log("token #"+ token_number + ") " + arr[i]);
        }
        //console.log(line);
        console.log("---");
       
        sql="insert into master_akt_format_kabelschlepp (category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail)";        
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
       // do whatever you want with line...
       if(last){
       // or check if it's the last one
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

   


       /*
       var sh = wb.getWorksheet("AKT updated Data");
       console.log(sh.rowCount);
       for (i = 1; i <= sh.rowCount; i++) {
        var result=sh.getRow(i).getCell(1).value;
        result += "|";
        result+=sh.getRow(i).getCell(2).value;
         result += "|";
        result+=sh.getRow(i).getCell(3).value;
         result += "|";
        result+=sh.getRow(i).getCell(4).value;
         result += "|";
        result+=sh.getRow(i).getCell(5).value;
         result += "|";
        result+=sh.getRow(i).getCell(6).value;
         result += "|";
        result+=sh.getRow(i).getCell(7).value;
         result += "|";
        result+=sh.getRow(i).getCell(8).value;
         result += "|";
        result+=sh.getRow(i).getCell(9).value;
         result += "|";
        result+=sh.getRow(i).getCell(10).value;
         result += "|";
        result+=sh.getRow(i).getCell(11).value;
         result += "|";
        result+=sh.getRow(i).getCell(12).value;
         result += "|";
        result+=sh.getRow(i).getCell(13).value;
         result += "|";
        result+=sh.getRow(i).getCell(14).value;
         result += "|";
        result+=sh.getRow(i).getCell(15).value;
         result += "|";
        result+=sh.getRow(i).getCell(16).value;
         result += "|";
        result+=sh.getRow(i).getCell(17).value;
         result += "|";
        result+=sh.getRow(i).getCell(18).value;
         result += "|";
        result+=sh.getRow(i).getCell(19).value;
         result += "|";
        result+=sh.getRow(i).getCell(20).value;
         result += "|";
        result+=sh.getRow(i).getCell(21).value;
         result += "|";
        result+=sh.getRow(i).getCell(22).value;
         result += "|";
        result+=sh.getRow(i).getCell(23).value;
         result += "|";
        result+=sh.getRow(i).getCell(24).value;
         result += "|";
        result+=sh.getRow(i).getCell(25).value;
         result += "|";
        result+=sh.getRow(i).getCell(26).value;
         result += "|";
        result+=sh.getRow(i).getCell(27).value;
         result += "|";
        result+=sh.getRow(i).getCell(28).value;
         result += "|";
        result+=sh.getRow(i).getCell(29).value;
         result += "|";
        result+=sh.getRow(i).getCell(30).value;
         result += "|";
        result+=sh.getRow(i).getCell(31).value;
 


        console.log(result);
        //console.log(sh.getRow(i).getCell(1).value+"|"+sh.getRow(i).getCell(2).value+"|"+sh.getRow(i).getCell(3).value+"|"+sh.getRow(i).getCell(4).value+"|"+sh.getRow(i).getCell(5).value+"|"+sh.getRow(i).getCell(6).value+"|"+sh.getRow(i).getCell(7).value+"|"+sh.getRow(i).getCell(8).value+"|"+sh.getRow(i).getCell(9).value+"|"+sh.getRow(i).getCell(10).value);
        //console.log(sh.getRow(i).getCell(2).value);
        }
        */
      });


       //const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
       //const data = xlsx.utils.sheet_to_json(worksheet, {range:4});
       //res.json(data);
       //for (const [column1, column2, column3, column4, column5, column6, column7, column8, column9, column10,column11, column12, column13, column14, column15, column16, column17, column18, column19, column20,column21, column22, column23, column24, column25, column26, column27, column28, column29, column30,column31] of Object.entries(data))
       //{
       //console.log("test");
       //db.query('insert into  master_akt_format_kabelschlepp (category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,conv>
       /*sql="insert into  master_akt_format_kabelschlepp (category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,
new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,
gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,
diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail) 
values ('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','')";
       db.query(sql);
       */
       /*
       sql="insert into master_akt_format_kabelschlepp (category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,
conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,gp,
pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,
diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail)";
       sql += " values ('";
       sql += column1;
       sql += "','";
       sql += column2;
       sql += "','";
       sql += column3;
       sql += "','";
       sql += column4;
       sql += "','";
       sql += column5;
       sql += "','";
       sql += column6;
       sql += "','";
       sql += column7;
       sql += "','";
       sql += column8;
       sql += "','";
       sql += column9;
       sql += "','";
       sql += column10;
       sql += "','";
       sql += column11;
       sql += "','";
       sql += column12;
       sql += "','";
       sql += column13;
       sql += "','";
       sql += column14;
       sql += "','";
       sql += column15;
       sql += "','";
       sql += column16;
       sql += "','";
       sql += column17;
       sql += "','";
       sql += column18;
       sql += "','";
       sql += column19;
       sql += "','";
       sql += column20;
       sql += "','";
       sql += column21;
       sql += "','";
       sql += column22;
       sql += "','";
       sql += column23;
       sql += "','";
       sql += column24;
       sql += "','";
       sql += column25;
       sql += "','";
       sql += column26;
       sql += "','";
       sql += column27;
       sql += "','";
       sql += column28;
       sql += "','";
       sql += column29;
       sql += "','";
       sql += column30;
       sql += "','";
       sql += column31;
       sql += "')";
       console.log(sql);
       db.query(sql);
       }
       */
       //data.forEach(function(row)
       //for (let row of data) 
       //{
        //const [column1, column2, column3, column4, column5, column6, column7, column8, column9, column10, column11, column12, column13, column14, column15, column16, column17, column18, column19, column20, column21, column22, column23, column24, column25, column26, column27, column28, column29, column30, column31] = row;
//db.query('insert into  master_akt_format_kabelschlepp (category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,
//new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,po_price_jpy_usd,po_price_currency,remark,thb_cost,
//gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,
//diff,dist_pl_mull,dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail) 
//VALUES (?, ?, ?,?,?,?,?,?,?,?,?, ?, ?,?,?,?,?,?,?,?,?, ?, ?,?,?,?,?,?,?,?,?)',[column1, column2, column3, column4, column5, column6, column7, column8, 
//column9, column10,column11, column12, column13, column14, column15, column16, column17, column18, column19, 
//column20,column21, column22, column23, column24, column25, column26, column27, column28, column29, column30, column31]);
        //category,part_no,previous_model_no,new_model_no,unit,manufacturer_suggested_retail_price,new_manufacturer_suggested_retail_price,conversion_to_ft,diff_for_cost,op_price,
        //po_price_jpy_usd,po_price_currency,remark,thb_cost,gp,pricelist_name,multiplier,make_same_price_as_standard_price,new_make_same_price_as_standard_price,standard_price,diff,dist_pl_mull,
        //dist_ex_rate,unit_price,new_unit_price,diff_unit_price,status,supplier_name,stock_reference,cutting_assembly,detail
       //}); 


        //res.json(data);


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
