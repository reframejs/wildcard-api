const express = require('express');
const goldpage = require('./goldpage');
const wildcard = require('./wildcard');

const server = express();

server.use(wildcard);
server.use(goldpage);

start(server);

function start() {
  const port = process.env.PORT || 3000;
  server.listen(port);
  console.log('Server is running at http://localhost:'+port);
}
