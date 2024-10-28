const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const transporter = require("../config/nodemailer");
require('dotenv').config();

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(401).send("You already have an account");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = await User.create({
      name,
      email,
      password: hash,
      otp,
      otpExpires,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email - OTP",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(201).json({ message: "OTP sent to your email. Please verify.", userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.otp === otp && user.otpExpires > Date.now()) {
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: "Email verified successfully", token });
    } else {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true });
      res.json({ message: "Logged in", token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
