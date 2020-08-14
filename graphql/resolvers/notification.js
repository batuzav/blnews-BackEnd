const Campaign = require("../../models/CampaignModel");
const moment = require("moment");
const { getUsersByCountries } = require("../resolvers/users");
const _ = require("underscore");
const { Expo } = require("expo-server-sdk");
const {
  sendNotificationWithExpoSDK,
} = require("../../expoNotification/expoNotificationSDK");

module.exports = {
  sendPushNotificationAccordingCampaignAndUser: () => {
    const now = moment().toDate();
    Campaign.find({
      startDate: { $lte: now.valueOf() },
      endDate: { $gte: now.valueOf() },
      // notified: false,
    }).then((campaigns) => {
      campaigns.map(async (campaign) => {
        let messages = [];
        let { country } = campaign;
        const users = await getUsersByCountries({ countries: country });
        const clearUsers = _.compact(users);
        clearUsers.map((clearUser) => {
          if (
            clearUser.tokkenApp !== "none" &&
            Expo.isExpoPushToken(clearUser.tokkenApp)
          ) {
            messages.push({
              to: clearUser.tokkenApp,
              title: campaign.title,
              sound: "default",
              body: campaign.bodyNotification || campaign.subtitle,
              android: {
                channelId: "chat-messages",
              },
            });
          }
        });
        const Sending = await sendNotificationWithExpoSDK(messages);
      });
    });
  },
};
