const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Module'},
    date: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    comment: { type: String },
})

module.exports = mongoose.model("Comment", CommentSchema);