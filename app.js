require('dotenv').config()
const Server = require('./models/server');
// import Server from './models/server.js';

const server = new Server();

server.listen();