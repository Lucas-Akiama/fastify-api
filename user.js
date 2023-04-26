const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class usuario extends Model {}
usuario.init({
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'usuario'
});

module.exports = usuario;
