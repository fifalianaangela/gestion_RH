const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PoliceAssurance = sequelize.define('PoliceAssurance', {
  numero_police: {
    type: DataTypes.STRING(50),
    primaryKey: true
  }
}, {
  tableName: 'PoliceAssurance',
  timestamps: false
});

module.exports = PoliceAssurance;