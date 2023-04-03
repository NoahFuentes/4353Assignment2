const express = require('express');
const cors = require('cors')
const connectToDB = require('./Data Base/connectToDB')
const server = express();
server.listen(5000);

console.log('server is listening on : http://localhost:5000')

connectToDB();
server.use(express.json());
server.use(cors());
server.use('/client', require('./Router/ClientRouter'));
server.use('/fuel', require('./Router/FuelRouter'));