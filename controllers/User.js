const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const createError = require("../error.js");
const User = require("../models/User"); // Ensure correct path to the User model

dotenv.config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, gender, age, weight, height, phone, location } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.name = name || user.name;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
    }
    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.weight = weight || user.weight;
    user.height = height || user.height;
    user.phone = phone || user.phone;
    user.location = location || user.location;

    const updatedUser = await user.save();
    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    await user.remove();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
