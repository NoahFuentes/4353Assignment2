const express = require("express");
const clientRouter = express.Router();
const {
  getClientRegister,
  getClientLogin,
  setClientInformation,
  viewPurchaseHistory,
} = require("../Controller/clientController");

clientRouter.route("/login").post(getClientLogin);
clientRouter.route("/register").post(getClientRegister);
clientRouter.route("/personal_information/:id").post(setClientInformation);

module.exports = clientRouter;
