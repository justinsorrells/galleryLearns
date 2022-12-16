const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userid: { type: String },
    sessionid: { type: String },
})

module.exports = mongoose.model("Session", SessionSchema);