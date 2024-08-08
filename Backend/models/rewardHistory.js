const db = require('../config/db');

const getP5History = (userId, callback) => {
  db.query('SELECT * FROM p5_history WHERE given_by = ? OR given_to = ?', [userId, userId], callback);
};

const createP5Transaction = (points, givenBy, givenTo, callback) => {
  db.query('INSERT INTO p5_history (points, given_by, given_to) VALUES (?, ?, ?)', [points, givenBy, givenTo], callback);
};

const deleteP5Transaction = (transactionId, callback) => {
  db.query('DELETE FROM p5_history WHERE id = ?', [transactionId], callback);
};

const getRewardHistory = (userId, callback) => {
  db.query('SELECT * FROM reward_history WHERE given_to = ?', [userId], callback);
};

const createRewardTransaction = (points, givenBy, givenTo, callback) => {
  db.query('INSERT INTO reward_history (points, given_by, given_to) VALUES (?, ?, ?)', [points, givenBy, givenTo], callback);
};

module.exports = { getP5History, createP5Transaction, deleteP5Transaction, getRewardHistory, createRewardTransaction };
