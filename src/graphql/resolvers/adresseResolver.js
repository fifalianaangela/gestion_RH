const { Adresse } = require('../../models');

const adresseResolver = {
  Query: {
    adresse: async (_, { id }) => {
      return await Adresse.findByPk(id);
    },
    adresses: async () => {
      return await Adresse.findAll();
    }
  },
  Mutation: {
    createAdresse: async (_, { input }) => {
      return await Adresse.create(input);
    },
    updateAdresse: async (_, { id, input }) => {
      const adresse = await Adresse.findByPk(id);
      if (!adresse) {
        throw new Error('Adresse not found');
      }
      await adresse.update(input);
      return adresse;
    },
    deleteAdresse: async (_, { id }) => {
      const adresse = await Adresse.findByPk(id);
      if (!adresse) {
        throw new Error('Adresse not found');
      }
      await adresse.destroy();
      return true;
    }
  }
};

module.exports = adresseResolver;