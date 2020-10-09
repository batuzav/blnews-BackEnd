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
    return pool;
  });
  return mssql;
};

const getActivityDib = async ({ dibNumber, getDIB }) => {
  const activity = await getDIB
    .request()
    .input("input_parameter", sql.Int, dibNumber)
    .query(
      "Select UserStatus  From tbl_Distributor where LegacyNumber like @input_parameter"
    )
    .then((result) => {
      if (result.recordset.length !== 0) return result.recordset[0].UserStatus;
      else return false;
    })
    .catch((err) => {
      return false;
    });

  return activity;
};

const knowDIBIsACtive = async ({ dibNumber }) => {
  let isActive = true;
  const getDIB = await getConexion();
  const activity = await getActivityDib({ dibNumber, getDIB });
  if (activity === false) {
    isActive = false;
  }
  if (activity !== 2) {
    isActive = false;
  }
  return isActive;
};
const RegisterDibInApp = async ({ dibNumber }) => {
  const getDIB = await getConexion();
  const dibInfo = await getDIB
    .request()
    .input("input_parameter", sql.Int, dibNumber)
    .query(
      "Select FirstName as firstName, LastName as lastName, EmailAddress as email, UserStatus as status, LegacyNumber as dibNumber, MarketName, MyPicture as img, Phone1 as phone From tbl_Distributor JOIN tbl_Markets ON tbl_Distributor.MarketID = tbl_Markets.ID  where LegacyNumber like @input_parameter"
    )
    .then((result) => {
      if (result.recordset.length !== 0) {
        return result.recordset[0];
      } else return false;
    })
    .catch((err) => console.error(err));

  return dibInfo;
};

module.exports = { getConexion, knowDIBIsACtive, RegisterDibInApp };
