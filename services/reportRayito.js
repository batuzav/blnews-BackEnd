const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
const sql = require("mssql");
const moment = require("moment-timezone");
const converter = require("json-2-csv");
const { getConexion } = require("../XirectDB/XirectDBConect");


app.get("/reportes", async (req, res) => {
    const yesterday = moment().tz("America/Mexico_City").subtract(3,'d').format('YYYY-MM-DD');
    const now = moment().tz("America/Mexico_City").format('YYYY-MM-DD');
    // converter.json2csv(CategoriesOptions, (err, csv) => {
    //     if (err) {
    //         throw err;
    //     }
    //     const destination = path.join(__dirname, `converted_report_${yesterday}.xlsx`);
            
    //     try {
    //         convertCsvToXlsx(csv, destination);
    //         } 
    //     catch (e) {
    //         console.error(e.toString());
    //         }
        
    //     })
    // ---------------PRODUCTIVO-----------------
    const getDIB = await getConexion();
    await getDIB
      .request()
      .input("yesterday", sql.DateTime, yesterday)
      .input("now", sql.DateTime, now)
      .query(`SELECT tbl_Orders_Header.LegacyNumber AS ORDER_NUMBER, tbl_Orders_Header.OrderType, OrderSource.OrderSourceName AS Order_Type, tbl_Addresses.Address AS SHIP_ADDRESS, tbl_Addresses.Address2 AS SJIP_ADDRESS_2, tbl_Addresses.city AS SHIP_CITY, tbl_Addresses.County AS SHIP_STATE_PROVINCE, tbl_Addresses.Zip AS SHIP_POSTALCODE, tbl_Orders_Header.CityTaxes, tbl_Markets.MarketName, tbl_Orders_Detail.itemName AS 'DESCRIPTION', tbl_Orders_Detail.Quantity AS PRODUCT_QUANTUTY ,tbl_Orders_Detail.UnitPrice AS PRODUCT_NUMBER, tbl_Orders_Header.OrderDate 
      FROM tbl_Orders_Detail
      JOIN tbl_Orders_Header ON tbl_Orders_Detail.OrderID = tbl_Orders_Header.ID
      JOIN tbl_Markets ON tbl_Orders_Header.MarketID = tbl_Markets.ID
      JOIN OrderSource ON tbl_Orders_Header.OrderSource  = OrderSource.OrderSourceId
      JOIN tbl_Addresses ON tbl_Orders_Header.ShippingAddressID = tbl_Addresses.Id
      WHERE tbl_Markets.ID=7 AND tbl_Orders_Header.OrderDate BETWEEN @yesterday AND @now`)
      .then((result) => {
        console.log("FIESTA");
        if (result.recordset) {
            console.log("HAY ALGO");
            // console.table(result.recordset);

            converter.json2csvAsync(result.recordset).then(csv => {
                const filePath = path.join(__dirname, `/public/converted_report_${now}.csv`);

                // print CSV string
                // console.log(csv);
            
                // write CSV to a file
                try {
                    fs.writeFileSync(filePath, csv);
                }
                catch(e) {
                    console.log('Some error occured - file either not saved or corrupted file saved.');
                    console.log('ERROR >>>>>', e)
                }

                // fs.writeFileSync(filePath, csv, 'utf8',  { flag: 'wx' },function (err) {
                //     if (err) {
                //       console.log('Some error occured - file either not saved or corrupted file saved.');
                //       console.log('ERROR CRECIENTE: >>>>>', err);
                //     } else{
                //       console.log('It\'s saved!');
                //     }
                //   });
                // res.download(`../public/converted_report_${now}.csv`, `converted_report_${now}.csv`);
            
            }).catch(err => console.log(err));
        
        }// 
      })
      .catch((err) => {
        console.log('err', err)
        res.status(400).json({
            ok: false,
            err
        });
        
        res.json({
            ok: true,
        });
   
    });  
});



module.exports = app;

