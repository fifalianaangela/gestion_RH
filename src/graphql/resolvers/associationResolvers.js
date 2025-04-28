const { BeneficiairePrincipal, ListeBeneficiaire, PoliceAssurance, Beneficiaire } = require('../../models');

const associationResolvers = {
  Mutation: {
    addBeneficiairePrincipal: async (_, { police_assurance_id, beneficiaire_id }) => {
      const beneficiairePrincipal = await BeneficiairePrincipal.create({
        police_assurance_id,
        beneficiaire_id
      });
      return beneficiairePrincipal;
    },
    removeBeneficiairePrincipal: async (_, { police_assurance_id, beneficiaire_id }) => {
      const result = await BeneficiairePrincipal.destroy({
        where: {
          police_assurance_id,
          beneficiaire_id
        }
      });
      return result > 0;
    },
    addListeBeneficiaire: async (_, { police_assurance_id, beneficiaire_id }) => {
      const listeBeneficiaire = await ListeBeneficiaire.create({
        police_assurance_id,
        beneficiaire_id
      });
      return listeBeneficiaire;
    },
    removeListeBeneficiaire: async (_, { police_assurance_id, beneficiaire_id }) => {
      const result = await ListeBeneficiaire.destroy({
        where: {
          police_assurance_id,
          beneficiaire_id
        }
      });
      return result > 0;
    }
  },
  PoliceAssurance: {
    beneficiairesPrincipaux: async (policeAssurance) => {
      return await Beneficiaire.findAll({
        include: [{
          model: PoliceAssurance,
          as: 'policesAssurancePrincipales',
          where: { numero_police: policeAssurance.numero_police }
        }]
      });
    },
    tousLesBeneficiaires: async (policeAssurance) => {
      return await Beneficiaire.findAll({
        include: [{
          model: PoliceAssurance,
          as: 'toutesLesPolicesAssurance',
          where: { numero_police: policeAssurance.numero_police }
        }]
      });
    }
  },
  Beneficiaire: {
    policesAssurancePrincipales: async (beneficiaire) => {
      return await PoliceAssurance.findAll({
        include: [{
          model: Beneficiaire,
          as: 'beneficiairesPrincipaux',
          where: { id: beneficiaire.id }
        }]
      });
    },
    toutesLesPolicesAssurance: async (beneficiaire) => {
      return await PoliceAssurance.findAll({
        include: [{
          model: Beneficiaire,
          as: 'tousLesBeneficiaires',
          where: { id: beneficiaire.id }
        }]
      });
    }
  }
};

module.exports = associationResolvers;