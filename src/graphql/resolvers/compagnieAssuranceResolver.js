const { CompagnieAssurance } = require('../../models');

const compagnieAssuranceResolver = {
  Query: {
    compagnieAssurance: async (_, { id }) => {
      return await CompagnieAssurance.findByPk(id);
    },
    compagniesAssurance: async () => {
      return await CompagnieAssurance.findAll();
    }
  },
  Mutation: {
    createCompagnieAssurance: async (_, { input }) => {
      return await CompagnieAssurance.create(input);
    },
    updateCompagnieAssurance: async (_, { id, input }) => {
      const compagnieAssurance = await CompagnieAssurance.findByPk(id);
      if (!compagnieAssurance) {
        throw new Error('Compagnie d\'assurance not found');
      }
      await compagnieAssurance.update(input);
      return compagnieAssurance;
    },
    deleteCompagnieAssurance: async (_, { id }) => {
      const compagnieAssurance = await CompagnieAssurance.findByPk(id);
      if (!compagnieAssurance) {
        throw new Error('Compagnie d\'assurance not found');
      }
      await compagnieAssurance.destroy();
      return true;
    }
  }
};

module.exports = compagnieAssuranceResolver;