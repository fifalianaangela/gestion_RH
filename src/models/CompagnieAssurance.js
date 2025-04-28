const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompagnieAssurance = sequelize.define('CompagnieAssurance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'CompagnieAssurance',
  timestamps: false
});

module.exports = CompagnieAssurance;