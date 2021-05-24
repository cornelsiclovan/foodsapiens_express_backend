const express = require('express');
const itemController = require('../controllers/item-controllers');
const router = express.Router();

router.get('/', itemController.getItems);

module.exports = router;