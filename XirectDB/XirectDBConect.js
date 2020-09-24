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

const knowDIBIsACtive = async ({ dibNumber }) => {
  const getDIB = await getConexion();
  const activity = await getDIB
    .request()
    .input("input_parameter", sql.Int, dibNumber)
    .query(
      "Select UserStatus  From tbl_Distributor where LegacyNumber like @input_parameter"
    )
    .then((result) => {
      console.log("FIESTA");
      console.dir(result.recordset, { maxArrayLength: null });
    })
    .catch((err) => console.error(err));
};

module.exports = { getConexion };
