const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userFind,
  allUser,
  getUserByEmail,
} = require("../Controllers/  userController");

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/getUser", getUserByEmail);

router.get("/user/:id", userFind);

router.get("/", allUser);

module.exports = router;
