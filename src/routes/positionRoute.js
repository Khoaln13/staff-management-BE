const express = require('express');
const router = express.Router();

const positionController = require('../app/controllers/PositionController');


router.get('/', positionController.getAllPositions);

module.exports = router;