require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middlware/is-Auth");
const socketServer = require("./config/socket-server");
const { tusk } = require("./cron/principalCron");
const { notFound } = require("./middlware/not-Found");
const converter = require("json-2-csv");
const fs = require("fs");
const sql = require("mssql");
const path = require('path');
Promise.promisifyAll(mongoose);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(isAuth);
app.use(require("./config/accessConfig"));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(require("./graphql/index"));
app.use(require("./services/reportRayito"));
app.get("*", (req, res) => {
  return res.status(404).send(notFound);
});

tusk.start();

mongoose
  .connect(`${process.env.DB}`, { useFindAndModify: false })
  .then(async () => {
    const server = app.listen(`${process.env.PORT}`, () => {
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    })
  });
  
