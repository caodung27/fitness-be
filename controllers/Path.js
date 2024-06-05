const Path = require("../models/Path");
const createError = require("../error");

const recordPath = async (req, res, next) => {
  try {
    const { type, start, end, speed, userId } = req.body;

    const newPath = new Path({
      userId,
      type,
      start,
      end,
      speed,
      createdAt: new Date().toISOString(),
    });

    const savedPath = await newPath.save();
    res.status(200).json(savedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPaths = async (req, res, next) => {
  try {
    const { filter } = req.query;
    let query = {};
    if (filter) {
      const parsedFilter = JSON.parse(filter);
      query = { ...parsedFilter };
    }
    const paths = await Path.find(query);
    res.status(200).json({ paths });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPathById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const path = await Path.findById(id);
    res.status(200).json(path);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPathsByDateTime = async (req, res, next) => {
  try {
    const { date, time, userId } = req.query;
    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

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
    let query = { userId };
    if (location) {
      query = {
        userId,
        $or: [
          { 'start.location': { $regex: location, $options: 'i' } },
          { 'end.location': { $regex: location, $options: 'i' } }
        ]
      };
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
    const query = { userId, speed };
    const pathData = await Path.find(query);
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePathById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, start, end, speed } = req.body;
    const updatedPath = await Path.findByIdAndUpdate(id, { type, start, end, speed }, { new: true });
    res.status(200).json(updatedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePathById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPath = await Path.findByIdAndDelete(id);
    res.status(200).json(deletedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  recordPath,
  getAllPaths,
  getPathById,
  searchPathsByDateTime,
  searchPathsByLocation,
  searchPathsBySpeed,
  updatePathById,
  deletePathById
};
