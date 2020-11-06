const Campaign = require("../../models/CampaignModel");
const User = require("../../models/usersModel");
const moment = require("moment");
const { checkAuth } = require("../../middlware/not-Found");

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
      createdBy,
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
          createdBy,
        });
        return newCampaign.save();
      })
      .then((result) => {
        const user = User.findOneAsync({_id: result._doc.createdBy}).then(user => {return user});
        return { ...result._doc, _id: result._doc._id.toString(), user };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  updateCampaign: (args) => {
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
      createdBy
    } = args.campaignInput;
    console.log('args.id', args.id)
    return Campaign.findOneAndUpdate(
      { _id: args.id },
      { title,
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
        imageBody, },
      { new: true }
    ).then(async (Campaign) => {
      const user = await User.findOneAsync({_id: createdBy}).then(user => {return user});
      console.log('user', user);
      console.log('result', Campaign);
      return {...{...Campaign, subtitle: Campaign.subtitle, 
        title: Campaign.title,  
        _id: args.id,
        counting: Campaign.counting,
        description: Campaign.description,
        country: Campaign.country,
        img: Campaign.img,
        timezone: Campaign.timezone,
        startDate: Campaign.startDate,
        endDate: Campaign.endDate,
        allUsers: Campaign.allUsers,
        status: Campaign.status,
        category: Campaign.category,
        imageBody: Campaign.imageBody,
        createdBy: Campaign.createdBy}, user};
    }).catch((err) => {
      throw err;
    });;
  },
  Campaigns: (args, req) => {
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
  getAllampaigns: (args, req) => {
    checkAuth(req);
    return Campaign.find()
      .then((Campaigns) => {
        return Campaigns.map((campaign) => {
          const user = User.findOneAsync({ _id: campaign.createdBy }).then(
            (user) => {
              return user;
            }
          );
          return { ...campaign._doc, _id: campaign.id, user };
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
  getCampaignsByCategory: ({ category }, req) => {
    const now = moment().toDate();
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
  getCampaignById: async ({ id }, req) => {
    checkAuth(req);
    const campaign = await Campaign.findByIdAsync({ _id: id }).then(
      (findedCampaign) => {
        return findedCampaign;
      }
    );
    if (!campaign) {
      throw new Error("Campaña no existe...");
    }
    const edit = await Campaign.findByIdAndUpdateAsync(
      { _id: id },
      { counting: campaign.counting++ }
    ).then((resolve) => {
      return resolve;
    });
    return campaign;
  },
};
