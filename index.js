const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3006;

//const port = 3007;

const webCrawlerRouter = require("./routes/webcrawler");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const editUserRouter = require("./routes/edituserrouter");
const deleteUserRouter = require("./routes/deleteuserrouter");
const listUserRouter = require("./routes/listuser");
const getUserByIdRouter = require("./routes/getuserbyid");
const uploadExcelRouter = require("./routes/uploadexcel");

const formidable = require('formidable');
var Excel = require('exceljs');
var lineReader = require('line-reader');
var fs = require('fs');

const upload_excel_update_master_sugar_stock_Router = require("./routes/upload_excel_update_master_sugar_stock");
const upload_excel_update_master_sprocket_pricelist_Router = require("./routes/upload_excel_update_master_sprocket_pricelist");
const upload_excel_update_master_small_size_chain_pricelist_Router = require("./routes/upload_excel_update_master_small_size_chain_pricelist");
const upload_excel_update_master_ptuc_other_dist_Router = require("./routes/upload_excel_update_master_ptuc_other_dist");
const upload_excel_update_master_ptuc_kte_Router = require("./routes/upload_excel_update_master_ptuc_kte");
const upload_excel_update_master_kte_stock_Router = require("./routes/upload_excel_update_master_kte_stock");
const upload_excel_update_master_jpy_chain_Router = require("./routes/upload_excel_update_master_jpy_chain");
const upload_excel_update_master_akt_format_warehouse_pricelist_Router = require("./routes/upload_excel_update_master_akt_format_warehouse_pricelist");
const upload_excel_update_master_akt_format_scg_group_chain_Router = require("./routes/upload_excel_update_master_akt_format_scg_group_chain");
const upload_excel_update_master_akt_format_scg_group_cam_clutch_Router = require("./routes/upload_excel_update_master_akt_format_scg_group_cam_clutch");
const upload_excel_update_master_akt_format_kabelschlepp_Router = require("./routes/upload_excel_update_master_akt_format_kabelschlepp");
const upload_excel_update_master_drivechain_Router = require("./routes/upload_excel_update_master_drivechain");
const upload_excel_update_user_data_tsubakimoto_Router = require("./routes/upload_excel_update_user_data_tsubakimoto");

const clear_master_tsubakimoto_database_Router = require("./routes/clear_master_tsubakimoto_database");

const get_master_akt_format_kabelschlepp_Router = require("./routes/get_master_akt_format_kabelschlepp");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
app.use(cors());

app.get("/", (req, res) => {
  res.json({ "API for Tsubakimoto Pricelist System": "ok" });
});

app.post("/master_data/listall", async (req, res) => {
 const db = require('./db');
 const config = require('./config');
 const helper = require('./helper');
 sql = "select * from master_tsubakimoto";
 console.log(sql);
 var results = await db.query(sql);
 console.log(results);
 res.json(results);
});

app.post("/master_data/deleteall", async (req, res) => {
 const db = require('./db');
 const config = require('./config');
 const helper = require('./helper');
 sql = "delete from master_tsubakimoto";
 console.log(sql);
 await db.query(sql);
 res.writeHead(200, {'Content-Type': 'application/json'});
 res.write
 (
         JSON.stringify
         (
              {
                 "status":true,
                 "deleteall":
                  {
                    "table": "master_tsubakimoto",
                    "result": "pass"
                  }
              }
         )
 );
 res.end();
});

app.post("/master_data/upload", async (req, res) => {
    const db = require('./db');
    const config = require('./config');
    const helper = require('./helper');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
     var oldpath = files.file[0].filepath;
     var newpath =  'uploaded_files/myupload.xlsx';
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
       else
       {
          var wb = new Excel.Workbook();
          wb.xlsx.readFile('uploaded_files/myupload.xlsx').then(function(){
          wb.csv.writeFile('uploaded_files/myupload.csv' )
          .then(async function() {
          console.log("saved csv...done");
          var line_cnt=0;
          lineReader.eachLine('uploaded_files/myupload.csv', async function(line, last) {
          line_cnt++;
          if (line_cnt >= 17)
          {
           var arr = line.split(",");
           for(var i=0;i<arr.length;i++) {
            if (arr[i]=="" || arr[i].indexOf('sharedFormula')!=-1) arr[i] = "blank";
            var token_number = i + 1;
            console.log("token #"+ token_number + ") " + arr[i]);
           }
           console.log("---");
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
});

app.use("/webcrawler", webCrawlerRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/listuser", listUserRouter);
app.use("/edit", editUserRouter);
app.use("/delete", deleteUserRouter);
app.use("/getuserbyid", getUserByIdRouter);
app.use("/upload_excel", uploadExcelRouter);
app.use("/upload_excel_update_master_sugar_stock",upload_excel_update_master_sugar_stock_Router);
app.use("/upload_excel_update_master_sprocket_pricelist",upload_excel_update_master_sprocket_pricelist_Router);
app.use("/upload_excel_update_master_small_size_chain_pricelist",upload_excel_update_master_small_size_chain_pricelist_Router);
app.use("/upload_excel_update_master_ptuc_other_dist",upload_excel_update_master_ptuc_other_dist_Router);
app.use("/upload_excel_update_master_ptuc_kte",upload_excel_update_master_ptuc_kte_Router);
app.use("/upload_excel_update_master_kte_stock",upload_excel_update_master_kte_stock_Router);
app.use("/upload_excel_update_master_jpy_chain",upload_excel_update_master_jpy_chain_Router);
app.use("/upload_excel_update_master_akt_format_warehouse_pricelist",upload_excel_update_master_akt_format_warehouse_pricelist_Router);
app.use("/upload_excel_update_master_akt_format_scg_group_chain",upload_excel_update_master_akt_format_scg_group_chain_Router);
app.use("/upload_excel_update_master_akt_format_scg_group_cam_clutch",upload_excel_update_master_akt_format_scg_group_cam_clutch_Router);
app.use("/upload_excel_update_master_akt_format_kabelschlepp",upload_excel_update_master_akt_format_kabelschlepp_Router);
app.use("/upload_excel_update_master_drivechain",upload_excel_update_master_drivechain_Router);
app.use("/upload_excel_update_user_data_tsubakimoto",upload_excel_update_user_data_tsubakimoto_Router);
app.use("/get_master_akt_format_kabelschlepp", get_master_akt_format_kabelschlepp_Router);
app.use("/clear_master_tsubakimoto_database", clear_master_tsubakimoto_database_Router);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
