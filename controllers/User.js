const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const createError = require("../error.js");
const User = require("../models/User");

dotenv.config();

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res, next) => {
  try {
    const { filter } = req.query;
    let query = {};
    if (filter) {
      const parsedFilter = JSON.parse(filter);
      query = { ...parsedFilter };
    }
    const users = await User.find(query);
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

// Lấy thông tin của một người dùng dựa trên ID
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

// Cập nhật thông tin của một người dùng dựa trên ID
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, gender, birthday, weight, height, phone, location, avatarUrl } = req.body;
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

    if (birthday) {
      const [day, month, year] = birthday.split('/');
      user.birthday = new Date(`${year}-${month}-${day}`);
    }

    user.weight = weight || user.weight;
    user.height = height || user.height;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.avatarUrl = location || user.avatarUrl;

    const updatedUser = await user.save();
    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

// Xóa người dùng dựa trên ID
const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

// Tìm kiếm người dùng dựa trên các tiêu chí nhất định
const searchUsers = async (req, res, next) => {
  try {
    const { name, email, gender, birthday, weight, height, location } = req.query;
    let filter = {};

    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = new RegExp(email, 'i');
    if (gender) filter.gender = gender;
    if (birthday) {
      const [day, month, year] = birthday.split('/');
      filter.birthday = new Date(`${year}-${month}-${day}`);
    }
    if (weight) filter.weight = weight;
    if (height) filter.height = height;
    if (location) filter.location = new RegExp(location, 'i');

    const users = await User.find(filter);
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
  searchUsers,
};
