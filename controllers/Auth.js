const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../error.js");
const User = require("../models/User"); // Ensure correct path to the User model

const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, location } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
    });

    // Save the user to the database
    const createdUser = await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "365d",
    });

    console.log("Token register: ", token);
    return res.status(200).json({ message: 'Register successful', token, user: createdUser });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {  
      expiresIn: "365d" 
    });

    console.log("Token login: ", token);
    return res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
