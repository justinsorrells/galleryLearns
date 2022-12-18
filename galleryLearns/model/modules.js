const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    title: { type: String },
    author: { type: String },
    date: { type: Date },
    category: [{ type: String }],
    summary: { type: String },
    headerImg: { type: String },
    content: { type: String },
})

module.exports = mongoose.model("Module", ModuleSchema);