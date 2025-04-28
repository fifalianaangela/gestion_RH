const { PoliceAssurance } = require('../../models');

const policeAssuranceResolver = {
  Query: {
    policeAssurance: async (_, { numero_police }) => {
      return await PoliceAssurance.findByPk(numero_police);
    },
    policesAssurance: async () => {
      return await PoliceAssurance.findAll();
    }
  },
  Mutation: {
    createPoliceAssurance: async (_, { input }) => {
      return await PoliceAssurance.create(input);
    },
    deletePoliceAssurance: async (_, { numero_police }) => {
      const policeAssurance = await PoliceAssurance.findByPk(numero_police);
      if (!policeAssurance) {
        throw new Error('Police d\'assurance not found');
      }
      await policeAssurance.destroy();
      return true;
    }
  }
};

module.exports = policeAssuranceResolver;