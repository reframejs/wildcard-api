const express = require('express');
const goldpage = require('goldpage');

const server = express();
module.exports = server;

server.use(goldpage.express);
