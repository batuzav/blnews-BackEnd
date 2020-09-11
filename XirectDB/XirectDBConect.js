const sql = require("mssql");

const config = {
  server: `${process.env.xirectServer}`,
  database: `${process.env.xirectDataBase}`,
  user: `${process.env.xirectUserDB}`,
  password: `${process.env.xirectUserDBPassword}`,
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
