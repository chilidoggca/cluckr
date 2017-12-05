const knexFile = require('../knexfile');
const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
module.exports = knex;
