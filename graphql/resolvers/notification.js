const Campaign = require("../../models/CampaignModel");
const moment = require("moment-timezone");
const { getUsersByCountries } = require("../resolvers/users");
const _ = require("underscore");
const { Expo } = require("expo-server-sdk");
const {
  sendNotificationWithExpoSDK,
} = require("../../expoNotification/expoNotificationSDK");
moment.locale("es");
module.exports = {
  sendPushNotificationAccordingCampaignAndUser: () => {
    const now = moment().tz("America/Mexico_City").format();
    console.log("now: >>>>", now);
    Campaign.find({
      startDate: { $lte: now.valueOf() },
      endDate: { $gte: now.valueOf() },
      notified: false,
    }).then((campaigns) => {
      campaigns.map(async (campaign) => {
        // const edit = await Campaign.findOneAndUpdateAsync(
        //   { _id: campaign._id },
        //   { notified: true },
        //   { new: true }
        // );
        let messages = [];
        let { country, startDate } = campaign;
        // console.log("IsEqual: >>>>>", now.isSame(startDate));
        const users = await getUsersByCountries({ countries: country });
        const clearUsers = _.compact(users);
        console.log("clearUsers", clearUsers);
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
              channelId: "pushChannel",
              data: {
                campaignId: campaign._id,
              },
            });
          }
        });
        // const Sending = await sendNotificationWithExpoSDK(messages);
        console.log("Sending", Sending);
      });
    });
  },
};
