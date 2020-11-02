const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionAppModel = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tokkenApp: {
        type: String,
        default: "none",
    },
    createdAt: {
        type: Date,
        required: true,
    }
});