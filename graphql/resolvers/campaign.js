const Campaign = require("../../models/CampaignModel");
const moment = require("moment");

module.exports = {
  createCampaign: (args) => {
    const {
      title,
      subtitle,
      description,
      country,
      img,
      timezone,
      startDate,
      endDate,
      allUsers,
      status,
      category,
      imageBody,
    } = args.campaignInput;
    return Campaign.findOne({ title })
      .then((campaign) => {
        if (campaign) {
          throw new Error("CAMPAÑA YA EXISTE");
        }
        const newCampaign = new Campaign({
          title,
          subtitle,
          description,
          country,
          img,
          timezone,
          startDate,
          endDate,
          allUsers,
          status,
          category,
          imageBody,
        });
        return newCampaign.save();
      })
      .then((result) => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  Campaigns: () => {
    const now = moment().toDate();
    return Campaign.find({
      startDate: { $lte: now.valueOf() },
      endDate: { $gte: now.valueOf() },
    })
      .then((Campaigns) => {
        return Campaigns.map((campaign) => {
          return { ...campaign._doc, _id: campaign.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  getActiveCampaigns: () => {
    const now = moment().toDate();
    return Campaign.find({
      startDate: { $lte: now.valueOf() },
      endDate: { $gte: now.valueOf() },
    })
      .then((Campaigns) => {
        return Campaigns.map((campaign) => {
          return { ...campaign._doc, _id: campaign.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  getCampaignsByCategory: ({ category }) => {
    const now = moment().toDate();
    console.log("categoria", category);
    return Campaign.find({
      startDate: { $lte: now.valueOf() },
      endDate: { $gte: now.valueOf() },
      category: { $in: category },
    }).then((Campaigns) => {
      return Campaigns.map((campaign) => {
        return { ...campaign._doc, _id: campaign.id };
      });
    });
  },
  getCampaignById: async ({ id }) => {
    const campaign = await Campaign.findByIdAsync({ _id: id }).then(
      (findedCampaign) => {
        return findedCampaign;
      }
    );
    console.log("Campaña: ", campaign);
    if (!campaign) {
      throw new Error("Campaña no existe...");
    }

    return campaign;
  },
};
