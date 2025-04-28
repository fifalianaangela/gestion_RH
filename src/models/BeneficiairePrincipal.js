const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BeneficiairePrincipal = sequelize.define('BeneficiairePrincipal', {
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
  tableName: 'BeneficiairePrincipal',
  timestamps: false
});

module.exports = BeneficiairePrincipal;