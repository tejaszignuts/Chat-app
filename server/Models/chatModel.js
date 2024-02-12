const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  member: Array,
});

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
