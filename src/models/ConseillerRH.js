const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConseillerRH = sequelize.define('ConseillerRH', {
  identifiant: {
    type: DataTypes.STRING(50),
    primaryKey: true
  }
}, {
  tableName: 'ConseillerRH',
  timestamps: false
});

module.exports = ConseillerRH;