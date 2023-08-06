
require('dotenv').config();
const harperive = require('harperive');

const DB_CONFIG = {
  harperHost: process.env.HARPERDB_URL,
  username: process.env.HARPERDB_USERNAME,
  password: process.env.HARPERDB_PW,
  schema: process.env.HARPERDB_SCHEMA
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);

module.exports = db;