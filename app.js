require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const isAuth = require("./middlware/is-Auth");
const socketServer = require("./config/socket-server");
const { tusk } = require("./cron/principalCron");
const { notFound } = require("./middlware/not-Found");
const converter = require("json-2-csv");
const fs = require("fs");
Promise.promisifyAll(mongoose);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(isAuth);
app.use(require("./graphql/index"));
app.get("*", (req, res) => {
  return res.status(404).send(notFound);
});

tusk.start();

mongoose
  .connect(`${process.env.DB}`, { useFindAndModify: false })
  .then(async () => {
    // const getDIB = await getConexion();
    const server = app.listen(`${process.env.PORT}`, () => {
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    });
    socketServer.startSocketServer(server);
    // getDIB
    //   .request()
    //   .input("input_parameter", sql.Int, 1387785)
    //   .query("Select *  From tbl_Distributor where LegacyNumber like 54091")
    //   .then((result) => {
    //     console.log("FIESTA");
    //     console.dir(result.recordset, { maxArrayLength: null });
    //   })
    //   .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.log(err);
  });
