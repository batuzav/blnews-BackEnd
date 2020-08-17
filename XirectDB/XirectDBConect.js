const sql = require("mssql");

const config = {
  server: "bodylogic.database.windows.net",
  database: "BodyLogic_Live",
  user: "bodylogicuser",
  password: "UMw$a8Zx5gx5du",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};
sql.on("error", (err) => {
  // ... error handler
  console.error("ERROR", err);
});

const getConexion = async () => {
  const mssql = await sql.connect(config).then((pool) => {
    console.log("Conexión realizada");
    return pool;
  });
  return mssql;
};

module.exports = { getConexion };
