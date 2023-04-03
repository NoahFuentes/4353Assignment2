const express = require('express');
const fuelRouter = express.Router();
const { fuelRateCalculator,viewPurchaseHistory } = require('../Controller/fuelController')

fuelRouter.route('/rate').post(fuelRateCalculator)
fuelRouter.route('/history').get(viewPurchaseHistory)

module.exports = fuelRouter;