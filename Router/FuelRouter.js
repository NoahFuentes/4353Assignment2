const express = require('express');
const fuelRouter = express.Router();
const { fuelRateCalculator,viewPurchaseHistory } = require('../Controller/fuelController')

fuelRouter.route('/rate/:id').post(fuelRateCalculator)
fuelRouter.route('/history/:id').get(viewPurchaseHistory)

module.exports = fuelRouter;