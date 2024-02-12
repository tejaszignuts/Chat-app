const userModel = require("../Models/userModels");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let jwtAuth = (_id) => {
  jwtKey = "secret";
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

//user registation
let userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!name || !email || !password) {
      return res.status(400).json("Please Fill all the data");
    }

    if (user) {
      return res.status(400).json("Given email is already exist");
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json("Email is incorrect please provide correct email");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("Enter the strong password");
    }
    //password hashing

    user = new userModel({ name, email, password });
    await user.save();

    const token = jwtAuth(user._id);

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//user login
let userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("Please Register First");
    }

    if (!email || !password) {
      return res.status(400).json("Please Fill all details");
    }

    if (!(user.email == email) || !(user.password == password)) {
      return res.status(400).json("Invalid Email or Password");
    }

    if (user.email == email && user.password == password) {
      return res.send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//user find by id
let userFind = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await userModel.findById(id);
    console.log(user);
    if (!user) {
      return res.status(400).json("No user found");
    }

    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

let getUserByEmail = async (req, res) => {
  try {
    let { email } = req.body;

    let user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json("Sorry User not found...");
    }
    if (!email) {
      return res.status(400).json("Please Enter Email");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//all user find
let allUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return res.status(400).json("No User Found");
    }
    if (users.length) {
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = { userRegister, userLogin, userFind, allUser, getUserByEmail };
