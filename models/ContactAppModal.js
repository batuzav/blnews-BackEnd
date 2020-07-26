const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Contact", ContactsSchema);
