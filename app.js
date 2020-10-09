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
const {
  getConexion,
  knowDIBIsACtive,
  RegisterDibInApp,
} = require("./XirectDB/XirectDBConect");
const converter = require("json-2-csv");
const fs = require("fs");
const sql = require("mssql");
Promise.promisifyAll(mongoose);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(isAuth);
app.use(require("./config/accessConfig"));
app.use(cors());
app.use(require("./graphql/index"));
app.get("*", (req, res) => {
  return res.status(404).send(notFound);
});

tusk.start();

mongoose
  .connect(`${process.env.DB}`, { useFindAndModify: false })
  .then(async () => {
   const getDIB = await getConexion();
    // console.time();
    // const isActive = await knowDIBIsACtive({ dibNumber: 416178 });
    // console.log("isActive: ", isActive);
    // console.timeEnd();
    const server = app.listen(`${process.env.PORT}`, () => {
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    });
    socketServer.startSocketServer(server);
    getDIB
      .request()
      .input("input_parameter", sql.Int, 1709367)
      .query(
        "Select FirstName, LastName, EmailAddress, UserStatus, LegacyNumber, MarketName   From tbl_Distributor JOIN tbl_Markets ON tbl_Distributor.MarketID = tbl_Markets.ID  where LegacyNumber like @input_parameter"
      )
      .then((result) => {
        console.log("FIESTA");
        if (result.recordset.length !== 0) {
          console.log("HAY ALGO");
          console.dir(result.recordset[0], { maxArrayLength: null });
        }
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.log(err);
  });
