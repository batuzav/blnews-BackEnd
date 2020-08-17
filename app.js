require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const isAuth = require("./middlware/is-Auth");
const socketServer = require("./config/socket-server");
const sql = require("mssql");
const { tusk } = require("./cron/principalCron");
const { notFound } = require("./middlware/not-Found");
const { getConexion } = require("./XirectDB/XirectDBConect");

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
    //   .query(
    //     "Select LegacyNumber, concat (FirstName,' ', MiddleName,' ',LastName) As Nombre, * From tbl_Distributor where LegacyNumber like @input_parameter"
    //   )
    //   .then((result) => {
    //     console.log(result.recordset);
    //   })
    //   .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.log(err);
  });
