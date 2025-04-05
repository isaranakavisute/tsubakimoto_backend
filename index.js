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
app.use("/webcrawler", webCrawlerRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/listuser", listUserRouter);
app.use("/edit", editUserRouter);
app.use("/delete", deleteUserRouter);
app.use("/getuserbyid", getUserByIdRouter);
app.use("/upload_excel", uploadExcelRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
