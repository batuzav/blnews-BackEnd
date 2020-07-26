const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  country: [String],
  img: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  allUsers: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    required: true,
  },
  category: [String],
});

module.exports = mongoose.model("Campaign", campaignSchema);
