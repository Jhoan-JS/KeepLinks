const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Link", LinkSchema);
