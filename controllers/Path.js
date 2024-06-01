const Path = require("../models/Path");
const createError = require("../error");

const recordPath = async (req, res, next) => {
  try {
    const { type, start, end, speed, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided' });
    }

    const newPath = new Path({
      userId,
      type,
      start,
      end,
      speed,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0]
    });

    const savedPath = await newPath.save();

    res.status(200).json(savedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPathHistory = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided' });
    }

    const pathData = await Path.find({ userId });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsByDateTime = async (req, res, next) => {
  try {
    const { date, time, userId } = req.query;
    let startDateTime, endDateTime;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided' });
    }

    if (time) {
      startDateTime = new Date(`${date}T${time}`);
      endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);
    } else {
      startDateTime = new Date(`${date}T00:00:00`);
      endDateTime = new Date(`${date}T23:59:59`);
    }

    const pathData = await Path.find({
      userId,
      createdAt: { $gte: startDateTime, $lt: endDateTime }
    });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsByLocation = async (req, res, next) => {
  try {
    const { location, userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided' });
    }

    const query = {
      userId
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
    const { speed, userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not provided' });
    }

    const query = {
      userId,
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
