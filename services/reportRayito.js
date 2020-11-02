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
    const yesterday = moment().tz("America/Mexico_City").subtract(1,'d').format('YYYY-MM-DD');
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
      .query(``)
      .then((result) => {
        console.log("FIESTA");
        if (result.recordset) {
            console.log("HAY ALGO");
            console.table(result.recordset);
        
            converter.json2csv(result.recordset, (err, csv) => {
            if (err) {
                throw err;
            }
            // const destination = path.join(__dirname, `converted_report_${yesterday}.xlsx`);
               
            // try {
            //     convertCsvToXlsx(csv, destination);
            //   } catch (e) {
            //     console.error(e.toString());
            //   }
            fs.writeFileSync(`../public/Reporte_${now}.csv`, data);
            
            })
            .catch(err => {
                res.status(400).json({
                    ok: false,
                    err
                });
            });
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

