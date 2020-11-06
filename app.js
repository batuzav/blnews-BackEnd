require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middlware/is-Auth");
const { tusk } = require("./cron/principalCron");
const { notFound } = require("./middlware/not-Found");
const sql = require("mssql");
const converter = require("json-2-csv");
const { getConexion } = require("./XirectDB/XirectDBConect");
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
    const server = app.listen(`${process.env.PORT}`, async () => {
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    //   const getDIB = await getConexion();
    // await getDIB
    //   .request()
    //   .query(`SELECT TABLE_NAME
    //   FROM INFORMATION_SCHEMA.COLUMNS
    //   WHERE COLUMN_NAME = 'TrackingNumber'
    //   ORDER BY DATA_TYPE`)
    //   .then((result) => {
    //     console.log("FIESTA");
    //     if (result.recordset) {
    //         console.log("HAY ALGO");
    //         console.table(result.recordset);
    //     }// 
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //     res.status(400).json({
    //         ok: false,
    //         err
    //     });
        
    //     res.json({
    //         ok: true,
    //     });
  
    // });
    })
    
  
  });

  
  
  // SELECT TOP 3 OrderDate, DateShipped, DateCompleted, CreatedDate, DeletedDate, DATEPRINTED, BACKDATED, DatePickedUp FROM tbl_Orders_Header ORDER BY ID desc