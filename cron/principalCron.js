const Campaign = require("../models/CampaignModel");
const User = require("../models/usersModel");
const cron = require("node-cron");
const moment = require("moment");

const tusk = cron.schedule(
  "*/1 * * * *",
  () => {
    var a = moment();
    console.log("MOMENT: ", a.format());
  },
  {
    scheduled: false,
    timezone: "America/Mexico_City",
  }
);

module.exports = { tusk };
