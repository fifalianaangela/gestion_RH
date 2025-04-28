const { Beneficiaire } = require('../../models');

const beneficiaireResolver = {
  Query: {
    beneficiaire: async (_, { id }) => {
      return await Beneficiaire.findByPk(id);
    },
    beneficiaires: async () => {
      return await Beneficiaire.findAll();
    }
  },
  Mutation: {
    createBeneficiaire: async (_, { input }) => {
      return await Beneficiaire.create(input);
    },
    updateBeneficiaire: async (_, { id, input }) => {
      const beneficiaire = await Beneficiaire.findByPk(id);
      if (!beneficiaire) {
        throw new Error('Beneficiaire not found');
      }
      await beneficiaire.update(input);
      return beneficiaire;
    },
    deleteBeneficiaire: async (_, { id }) => {
      const beneficiaire = await Beneficiaire.findByPk(id);
      if (!beneficiaire) {
        throw new Error('Beneficiaire not found');
      }
      await beneficiaire.destroy();
      return true;
    }
  }
};

module.exports = beneficiaireResolver;