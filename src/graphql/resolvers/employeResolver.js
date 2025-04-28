const { Employe, Adresse, PoliceAssurance } = require('../../models');

const employeResolver = {
  Query: {
    employe: async (_, { numero_employe }) => {
      return await Employe.findByPk(numero_employe);
    },
    employes: async () => {
      return await Employe.findAll();
    }
  },
  Mutation: {
    createEmploye: async (_, { input }) => {
      return await Employe.create(input);
    },
    updateEmploye: async (_, { numero_employe, input }) => {
      const employe = await Employe.findByPk(numero_employe);
      if (!employe) {
        throw new Error('Employe not found');
      }
      await employe.update(input);
      return employe;
    },
    deleteEmploye: async (_, { numero_employe }) => {
      const employe = await Employe.findByPk(numero_employe);
      if (!employe) {
        throw new Error('Employe not found');
      }
      await employe.destroy();
      return true;
    }
  },
  Employe: {
    adresse: async (employe) => {
      return await Adresse.findByPk(employe.adresse_id);
    },
    policeAssurance: async (employe) => {
      return await PoliceAssurance.findByPk(employe.numero_police_assurance);
    }
  }
};

module.exports = employeResolver;