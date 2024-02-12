const messageModel = require("../Models/messageModel");

//create msg

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const responce = await message.save();
    return res.status(200).json(responce);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const msg = await messageModel.find({ chatId });
    console.log("mes backend", msg);
    if (msg.length === 0) {
      return res.status(400).json("Message not found");
    }
    return res.status(200).json(msg);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessage,
};
