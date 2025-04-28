const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Adresse = sequelize.define('Adresse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rue: {
    type: DataTypes.STRING(255)
  },
  ville: {
    type: DataTypes.STRING(100)
  },
  code_postale: {
    type: DataTypes.STRING(20)
  }
}, {
  tableName: 'Adresse',
  timestamps: false
});

module.exports = Adresse;