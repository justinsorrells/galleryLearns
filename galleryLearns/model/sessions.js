const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    _id: { type: String },
    expires: { type: Date },
    cookie: { type: String },
})

module.exports = mongoose.model("Session", SessionSchema);