const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

router.get('/users/:id/p5', rewardController.getP5History);
router.post('/users/:id/p5', rewardController.createP5Transaction);
router.delete('/users/:id/p5/:transactionId', rewardController.deleteP5Transaction);
router.get('/users/:id/rewards', rewardController.getRewardHistory);

module.exports = router;
