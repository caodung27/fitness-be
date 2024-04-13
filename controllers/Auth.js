const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../error.js");
const db = require("../models/index.js");

const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, location } = req.body;

    // Check if the email is in use
    const existingUser = await db.models.User.findOne({ where: { email } });
    console.log("Existing user: ", existingUser);
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await db.models.User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_TOKEN, {
      expiresIn: "365d",
    });
    console.log("Token register: ", token);
    return res.status(200).json({ message: 'Register successful', token, user });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.models.User.findOne({ where: { email } });
    // Check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log(user);
    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {  
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
