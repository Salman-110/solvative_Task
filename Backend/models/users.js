const db = require('../config/db');

const getUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

const getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

const createUser = (name, callback) => {
  db.query('INSERT INTO users (name, p5_balance, reward_balance) VALUES (?, 100, 0)', [name], callback);
};

const updateUser = (id, name, p5Balance, rewardBalance, callback) => {
  db.query('UPDATE users SET name = ?, p5_balance = ?, reward_balance = ? WHERE id = ?', [name, p5Balance, rewardBalance, id], callback);
};

module.exports = { getUsers, getUserById, createUser, updateUser };
