const { ConseillerRH } = require('../../models');

const conseillerRHResolver = {
  Query: {
    conseillerRH: async (_, { identifiant }) => {
      return await ConseillerRH.findByPk(identifiant);
    },
    conseillersRH: async () => {
      return await ConseillerRH.findAll();
    }
  },
  Mutation: {
    createConseillerRH: async (_, { input }) => {
      return await ConseillerRH.create(input);
    },
    deleteConseillerRH: async (_, { identifiant }) => {
      const conseillerRH = await ConseillerRH.findByPk(identifiant);
      if (!conseillerRH) {
        throw new Error('Conseiller RH not found');
      }
      await conseillerRH.destroy();
      return true;
    }
  }
};

module.exports = conseillerRHResolver;