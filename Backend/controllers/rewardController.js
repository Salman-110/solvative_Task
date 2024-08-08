const Reward = require('../models/rewardHistory');
const User = require('../models/users');

// Get P5 History
const getP5History = (req, res) => {
  const { id } = req.params;
  Reward.getP5History(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Create P5 Transaction
const createP5Transaction = async (req, res) => {
  const { points, givenBy, givenTo } = req.body;

  try {
    // Get current balances
    const [userFrom] = await User.getUserById(givenBy);
    const [userTo] = await User.getUserById(givenTo);

    // Check if userFrom has enough P5 points
    if (userFrom.p5_balance < points) {
      return res.status(400).json({ error: 'Insufficient P5 balance' });
    }

    // Deduct points from userFrom and add to userTo
    User.updateUser(givenBy, userFrom.name, userFrom.p5_balance - points, userFrom.reward_balance, (err) => {
      if (err) return res.status(500).json(err);

      User.updateUser(givenTo, userTo.name, userTo.p5_balance + points, userTo.reward_balance, (err) => {
        if (err) return res.status(500).json(err);

        Reward.createP5Transaction(points, givenBy, givenTo, (err) => {
          if (err) return res.status(500).json(err);
          res.status(201).json({ message: 'P5 transaction successful' });
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete P5 Transaction
const deleteP5Transaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const [transaction] = await Reward.getP5History(transactionId, (err) => {
      if (err) throw err;
    });

    const { points, given_by, given_to } = transaction;

    const [userFrom] = await User.getUserById(given_by);
    const [userTo] = await User.getUserById(given_to);

    // Revert balances
    User.updateUser(given_by, userFrom.name, userFrom.p5_balance + points, userFrom.reward_balance, (err) => {
      if (err) throw err;

      User.updateUser(given_to, userTo.name, userTo.p5_balance - points, userTo.reward_balance, (err) => {
        if (err) throw err;

        Reward.deleteP5Transaction(transactionId, (err) => {
          if (err) throw err;
          res.json({ message: 'P5 transaction deleted' });
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Reward History
const getRewardHistory = (req, res) => {
  const { id } = req.params;
  Reward.getRewardHistory(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Create Reward Transaction
const createRewardTransaction = (req, res) => {
  const { points, givenBy, givenTo } = req.body;

  // Rewards are earned, so here, implementing logic for creating reward history
  Reward.createRewardTransaction(points, givenBy, givenTo, (err) => {
    if (err) return res.status(500).json(err);

    User.getUserById(givenTo, (err, results) => {
      if (err) return res.status(500).json(err);

      const user = results[0];
      User.updateUser(givenTo, user.name, user.p5_balance, user.reward_balance + points, (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Reward transaction successful' });
      });
    });
  });
};

module.exports = { getP5History, createP5Transaction, deleteP5Transaction, getRewardHistory, createRewardTransaction };
