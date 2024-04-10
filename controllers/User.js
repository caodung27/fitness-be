const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const createError = require("../error.js");
const db = require("../models/index.js");

dotenv.config();

const getAllUsers = async (req, res, next) => {
    try {
      const users = await db.models.User.findAll();
      return res.status(200).json({ users });
    } catch (error) {    
      return next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await db.models.User.findOne({ where: { id } });
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
      const { name, password, age, phone, location } = req.body;
      const user = await db.models.User.findOne({ where: { id } });
      if (!user) {
        return next(createError(404, "User not found"));
      }
      user.name = name || user.name;
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        user.password = hashedPassword;
      }
      user.age = age || user.age;
      user.phone = phone || user.phone;
      user.location = location || user.location;
      await user.save();
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      return next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await db.models.User.findOne({ where: { id } });
      if (!user) {
        return next(createError(404, "User not found"));
      }
      await user.destroy();
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