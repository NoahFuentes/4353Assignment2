const express = require('express');
const clientRouter = express.Router();
const { getClientRegister, getClientLogin, setClientInformation, getClient } = require('../Controller/clientController')

clientRouter.route('/user').get(getClient)
clientRouter.route('/login').post(getClientLogin)
clientRouter.route('/register').post(getClientRegister)
clientRouter.route('/personal_information').post(setClientInformation)


module.exports = clientRouter;