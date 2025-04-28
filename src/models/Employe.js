const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employe = sequelize.define('Employe', {
  numero_employe: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255)
  },
  numero_police_assurance: {
    type: DataTypes.STRING(50),
    references: {
      model: 'PoliceAssurance',
      key: 'numero_police'
    }
  },
  adresse_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Adresse',
      key: 'id'
    }
  }
}, {
  tableName: 'Employe',
  timestamps: false
});

module.exports = Employe;