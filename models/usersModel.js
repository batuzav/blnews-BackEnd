const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  dibNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tokkenApp: {
    type: String,
    default: "none",
  },
  countriesToSee: {
    type: [{}],
    default: [{ value: "MXN", label: "México" }],
  },
  img: {
    type: String,
    default: "none",
  },
  systemType: {
    type: String,
    enum: ["user", "admin", "rhu", "rhb"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
