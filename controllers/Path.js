const db = require("../models/index.js");
const { verifyToken } = require('../middleware/verifyToken');
const { Op } = require('sequelize');

const recordPath = async (req, res, next) => {
  try {
    const { type, start, end, speed } = req.body;
    const newPath = await db.models.Path.create({
      userId: req.user.id,
      type,
      start,
      end,
      speed,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0] 
    });
    res.status(200).json(newPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPathHistory = async (req, res, next) => {
  try {
    const pathData = await db.models.Path.findAll({
      where: {
        userId: req.user.id
      }
    });
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
      startDateTime = new Date(`${date}T00:00:00`);
      endDateTime = new Date(`${date}T23:59:59`);
    }

    const pathData = await db.models.Path.findAll({
      where: {
        userId: req.user.id,
        createdAt: { [Op.between]: [startDateTime, endDateTime] }
      }
    });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const searchPathsByLocation = async (req, res, next) => {
  try {
    const location = req.query.location;
    let query = {
      where: {
        userId: req.user.id
      }
    };
    if (location) {
      query.where.location = { [Op.like]: `%${location}%` };
    }
    const pathData = await db.models.Path.findAll(query);
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const searchPathsBySpeed = async (req, res, next) => {
  try {
    const { speed } = req.query;
    const pathData = await db.models.Path.findAll({
      where: {
        userId: req.user.id,
        speed: speed ? { [Op.eq]: speed } : undefined
      }
    });
    res.status(200).json(pathData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  recordPath: [verifyToken, recordPath],
  getPathHistory: [verifyToken, getPathHistory],
  searchPathsByDateTime: [verifyToken, searchPathsByDateTime],
  searchPathsByLocation: [verifyToken, searchPathsByLocation],
  searchPathsBySpeed: [verifyToken, searchPathsBySpeed]
};
