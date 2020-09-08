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
    //   .query(
    //     `SELECT
    //   [PromoCode].Description,
    //   [PromoCode].[PromoCode],
    //   [PromoCodeDetail].[DistributorLegacyNumber],
    //   [PromoCodeDetail].[OrderHeaderLegacyNumber],
    //   [PromoCodeDetail].[CreatedDate]
    //   FROM [dbo].[PromoCode]
    //   inner join [PromoCodeDetail] on [PromoCodeDetail].[PromoCodeID] = [PromoCode].[ID]
    //   where [PromoCodeDetail].[CreatedDate] BETWEEN '2020-06-01'  and '2020-06-30' order by [PromoCodeDetail].[CreatedDate];`
    //   )
    //   .then((result) => {
    //     // console.dir(result.recordset, { maxArrayLength: null });
    //     converter.json2csv(result.recordset, (err, csv) => {
    //       if (err) {
    //         throw err;
    //       }

    //       // print CSV string
    //       // console.log("CSV DEMOOO", csv);

    //       // write CSV to a file
    //       fs.writeFileSync("ReportePromocodeJUn.csv", csv);
    //     });
    //   })
    //   .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.log(err);
  });
