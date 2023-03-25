const express = require("express");
const cors = require("cors");
const server = express();
server.listen(5000);

server.use(express.json());
server.use(cors());
server.use("/client", require("./Router/ClientRouter"));
server.use("/fuel", require("./Router/FuelRouter"));
