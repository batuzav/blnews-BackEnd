const cron = require("node-cron");
const {
  sendPushNotificationAccordingCampaignAndUser,
} = require("../graphql/resolvers/notification");

const tusk = cron.schedule(
  "*/1 * * * *",
  () => {
    // sendPushNotificationAccordingCampaignAndUser();
    console.log("FUNCIONA HEROKU ");
  },
  {
    scheduled: false,
    timezone: "America/Mexico_City",
  }
);

module.exports = { tusk };
