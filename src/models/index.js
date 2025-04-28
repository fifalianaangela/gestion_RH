const Adresse = require('./Adresse');
const Beneficiaire = require('./Beneficiaire');
const PoliceAssurance = require('./PoliceAssurance');
const Employe = require('./Employe');
const BeneficiairePrincipal = require('./BeneficiairePrincipal');
const ListeBeneficiaire = require('./ListeBeneficiaire');
const ConseillerRH = require('./ConseillerRH');
const CompagnieAssurance = require('./CompagnieAssurance');

// Define relationships between models
Employe.belongsTo(Adresse, { foreignKey: 'adresse_id' });
Adresse.hasMany(Employe, { foreignKey: 'adresse_id' });

Employe.belongsTo(PoliceAssurance, { foreignKey: 'numero_police_assurance' });
PoliceAssurance.hasMany(Employe, { foreignKey: 'numero_police_assurance' });

// BeneficiairePrincipal associations
PoliceAssurance.belongsToMany(Beneficiaire, { 
  through: BeneficiairePrincipal,
  foreignKey: 'police_assurance_id',
  otherKey: 'beneficiaire_id',
  as: 'beneficiairesPrincipaux'
});

Beneficiaire.belongsToMany(PoliceAssurance, {
  through: BeneficiairePrincipal,
  foreignKey: 'beneficiaire_id',
  otherKey: 'police_assurance_id',
  as: 'policesAssurancePrincipales'
});

// ListeBeneficiaire associations
PoliceAssurance.belongsToMany(Beneficiaire, {
  through: ListeBeneficiaire,
  foreignKey: 'police_assurance_id',
  otherKey: 'beneficiaire_id',
  as: 'tousLesBeneficiaires'
});

Beneficiaire.belongsToMany(PoliceAssurance, {
  through: ListeBeneficiaire,
  foreignKey: 'beneficiaire_id',
  otherKey: 'police_assurance_id',
  as: 'toutesLesPolicesAssurance'
});

module.exports = {
  Adresse,
  Beneficiaire,
  PoliceAssurance,
  Employe,
  BeneficiairePrincipal,
  ListeBeneficiaire,
  ConseillerRH,
  CompagnieAssurance
};