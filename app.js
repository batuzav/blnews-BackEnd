require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const isAuth = require("./middlware/is-Auth");
const socketServer = require("./config/socket-server");
const { tusk } = require("./cron/principalCron");
const { notFound } = require("./middlware/not-Found");
const { getConexion } = require("./XirectDB/XirectDBConect");
const converter = require("json-2-csv");
const fs = require("fs");
const sql = require("mssql");
const moment = require("moment");
Promise.promisifyAll(mongoose);
moment.locale("es");

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
      const now = moment().toDate();
      console.log("NOW:", now);
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    });
    socketServer.startSocketServer(server);
    // getDIB
    //   .request()
    //   .input("input_parameter", sql.Int, 6666)
    //   .query(
    //     "Select UserStatus, concat (FirstName,' ', MiddleName,' ',LastName) As Nombre  From tbl_Distributor where LegacyNumber like @input_parameter"
    //   )
    //   .then((result) => {
    //     console.log("FIESTA");
    //     if (result.recordset) {
    //       console.log("HAY ALGO");
    //     }
    //     console.dir(result.recordset, { maxArrayLength: null });
    //   })
    //   .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.log(err);
  });
