const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const db = require("./config/db");
var cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(cookieParser()); // use to read format cookie

const port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));

var cors = require("cors");
app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: ["tokenId"],
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",
    "http://localhost:3000",
    "http://localhost:5000"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

var methodOverride = require("method-override");

app.use(methodOverride("_method"));
const route = require("./routers");
route(app);
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
