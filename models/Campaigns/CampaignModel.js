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
  country: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
