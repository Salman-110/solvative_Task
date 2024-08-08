const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:id', userController.updateUser);

module.exports = router;
