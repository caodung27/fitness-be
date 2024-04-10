const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createError = require("../error.js");
const db = require("../models/index.js");

dotenv.config();

const userRegister = async (req, res, next) => {
  try {
    // console.log("Register function called");
    const { name, email, password, age, phone, location } = req.body;
    // console.log(`Email: ${email}, Password: ${password}, Name: ${name}`);

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
      age,
      phone,
      location,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "365d",
    });
    return res.status(200).json({ message: 'Register successful', token, user });
  } catch (error) {
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
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
      expiresIn: "365d",
    });
    return res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
