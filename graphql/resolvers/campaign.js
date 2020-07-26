const Campaign = require("../../models/CampaignModel");

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
    return Campaign.find()
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
    return Campaign.find()
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
    console.log("categoria", category);
    return Campaign.find({ category: { $all: [category] } }).then(
      (Campaigns) => {
        console.log("camañas: ", Campaigns);
        return Campaigns.map((campaign) => {
          return { ...campaign._doc, _id: campaign.id };
        });
      }
    );
  },
};
