const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListeBeneficiaire = sequelize.define('ListeBeneficiaire', {
  police_assurance_id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    references: {
      model: 'PoliceAssurance',
      key: 'numero_police'
    }
  },
  beneficiaire_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Beneficiaire',
      key: 'id'
    }
  }
}, {
  tableName: 'ListeBeneficiaire',
  timestamps: false
});

module.exports = ListeBeneficiaire;