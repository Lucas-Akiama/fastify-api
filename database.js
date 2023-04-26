const { Sequelize } = require('sequelize');
const config = require('./config');
const User = require('./user');

const sequelize = new Sequelize(config.development);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com o PostgreSQL.');
    await User.sync();
    console.log('Modelo User sincronizado com o PostgreSQL.');
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error);
  }
}

module.exports = { sequelize, connect };
