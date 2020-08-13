const cron = require("node-cron");
const {
  sendPushNotificationAccordingCampaignAndUser,
} = require("../graphql/resolvers/notification");

const tusk = cron.schedule(
  "*/1 * * * *",
  () => {
    sendPushNotificationAccordingCampaignAndUser();
  },
  {
    scheduled: false,
    timezone: "America/Mexico_City",
  }
);
//send notifications
module.exports = { tusk };
