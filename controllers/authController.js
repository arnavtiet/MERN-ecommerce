const { hashPassword, compare } = require("../helper/authHelper.js");
const user = require("../models/user.js");
const OrderModel = require("../models/order");
const { createSession } = require("../services/sessionService");
const { v4: uuidv4 } = require('uuid');

const usermodel = require("../models/user.js");
const JWT = require("jsonwebtoken");
const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    const phnumber = await usermodel.findOne({ phone });
    if (phnumber) {
      return res.send({
        success: false,
        message: "PHONE NUMBER ALREADY IN USE",
      });
    }
    //existing user
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "user already exist",
      });
    }

    //register
    const hashedPassword = await hashPassword(password);
    const user = new usermodel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }
    const existingUser = await usermodel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User Not found" });
    }
    const match = await compare(password, existingUser.password);
    if (!match) {
      return res
        .status(404)
        .send({ success: false, message: "password is invalid" });
    }
    
    // Create Redis session instead of JWT
    const sessionId = uuidv4();
    const userData = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      address: existingUser.address,
      role: existingUser.role,
    };
    
    await createSession(sessionId, userData);
    
    res.status(200).send({
      success: true,
      message: "Login success",
      user: userData,
      sessionId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "cannot login" });
  }
};

const passwordcheckController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User Not found" });
    }
    const match = await compare(password, existingUser.password);
    if (match) {
      return res
        .status(200)
        .send({ success: true, message: "Password Matched successfully" });
    } else if (!match) {
      return res.send({ success: false, message: "Password Incorrect " });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};
//update profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//user orders
const userordersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer", "name");
    if (orders) {
      res.send(orders).status(200);
    } else {
      res.send({ success: false, message: "No orders found" }).status(400);
    }
  } catch (error) {
    res.send(error).status(500);
    console.log(error);
  }
};
module.exports = {
  loginController,
  registerController,
  passwordcheckController,
  updateProfileController,
  userordersController,
};
