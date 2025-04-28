const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Beneficiaire = sequelize.define('Beneficiaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'Beneficiaire',
  timestamps: false
});

module.exports = Beneficiaire;