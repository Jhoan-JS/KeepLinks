const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinkSchema = Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Link", LinkSchema);
