const express = require("express");
const app = express();

app.use((req, res, next) => {
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Metodos de solicitud que deseas permitir
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

module.exports = app;
