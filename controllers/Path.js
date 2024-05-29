const Path = require("../models/Path");
const createError = require("../error");
const verifyToken = require("../middleware/verifyToken");

const recordPath = async (req, res, next) => {
  try {
    const { type, start, end, speed } = req.body;

    const userId = req.user._id;
    console.log("userId: ", userId);

    // Create new Path instance with userId included
    const newPath = new Path({
      userId: req.user._id,
      type,
      start,
      end,
      speed,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0]
    });

    // Save the new Path document
    const savedPath = await newPath.save();

    res.status(200).json(savedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPathHistory = async (req, res, next) => {
  try {
    const pathData = await Path.find({ userId: req.user._id });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsByDateTime = async (req, res, next) => {
  try {
    const { date, time } = req.query;
    let startDateTime, endDateTime;

    if (time) {
      startDateTime = new Date(`${date}T${time}`);
      endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);
    } else {
      startDateTime = new Date(`${date}T00:00:00`);
      endDateTime = new Date(`${date}T23:59:59`);
    }

    const pathData = await Path.find({
      userId: req.user._id,
      createdAt: { $gte: startDateTime, $lt: endDateTime }
    });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsByLocation = async (req, res, next) => {
  try {
    const location = req.query.location;
    const query = {
      userId: req.user._id
    };
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    const pathData = await Path.find(query);
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsBySpeed = async (req, res, next) => {
  try {
    const { speed } = req.query;
    const query = {
      userId: req.user._id,
    };
    if (speed) {
      query.speed = speed;
    }
    const pathData = await Path.find(query);
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  recordPath,
  getPathHistory,
  searchPathsByDateTime,
  searchPathsByLocation,
  searchPathsBySpeed
};
