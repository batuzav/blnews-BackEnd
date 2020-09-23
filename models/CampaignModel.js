const mongoose = require("mongoose");
const { object } = require("underscore");

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
  bodyNotification: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  country: {
    type: [String],
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
  category: {
    type: [String],
    required: true,
  },
  notified: {
    type: Boolean,
    default: false,
  },
  imageBody: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  counting: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
