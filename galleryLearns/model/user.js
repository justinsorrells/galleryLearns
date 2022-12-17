const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    cookie: {type: String}
});

module.exports = mongoose.model("User", UserSchema);