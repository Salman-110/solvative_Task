const User = require('../models/users');
const Reward = require('../models/rewardHistory');

const getUsers = (req, res) => {
  User.getUsers((err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results[0]);
  });
};

const createUser = (req, res) => {
  const { name } = req.body;
  User.createUser(name, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(results);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, p5Balance, rewardBalance } = req.body;
  User.updateUser(id, name, p5Balance, rewardBalance, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

module.exports = { getUsers, getUserById, createUser, updateUser };
