require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const isAuth = require("./middlware/is-Auth");
const socketServer = require("./config/socket-server");
const { tusk } = require("./cron/principalCron");

Promise.promisifyAll(mongoose);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(isAuth);
app.use(require("./graphql/index"));

// tusk.start();

mongoose
  .connect(`${process.env.DB}`, { useFindAndModify: false })
  .then(() => {
    const server = app.listen(`${process.env.PORT}`, () => {
      console.log(`Se esta escuchando el puerto:  ${process.env.PORT}`);
    });
    socketServer.startSocketServer(server);
  })
  .catch((err) => {
    console.log(err);
  });
