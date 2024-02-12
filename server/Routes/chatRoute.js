const express = require("express");
const router = express.Router();

const {
  createChat,
  findUserChat,
  findChat,
} = require("../Controllers/chatController");

router.post("/", createChat);
router.get("/:id", findUserChat);
router.get("/chat/:firstId/:secondId", findChat);
module.exports = router;
