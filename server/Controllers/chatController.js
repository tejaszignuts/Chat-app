const chatModel = require("../Models/chatModel");

//createChat - post req

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      member: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = new chatModel({
      member: [firstId, secondId],
    });

    const responce = await newChat.save();

    return res.status(200).json(responce);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//findChat

const findUserChat = async (req, res) => {
  try {
    const id = req.params.id;
    const chat = await chatModel.find({ member: { $in: [id] } });
    if (chat.length === 0) {
      return res.status(400).json("No chat Found");
    }
    return res.status(200).json(chat);
  } catch (err) {
    return res.status(500).json(err);
  }
};
//getUserChat

const findChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      member: { $all: [firstId, secondId] },
    });

    return res.status(200).res(chat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { createChat, findUserChat, findChat };
