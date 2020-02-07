const express = require('express');
const wildcard = require('@wildcard-api/server/express');

const server = express();
module.exports = server;

server.use(express.json());

server.use(wildcard(async req => {
  const context = {};
  context.headers = req.headers;
  return context;
}));
