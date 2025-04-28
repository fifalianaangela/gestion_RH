const adresseResolver = require('./adresseResolver');
const beneficiaireResolver = require('./beneficiaireResolver');
const policeAssuranceResolver = require('./policeAssuranceResolver');
const employeResolver = require('./employeResolver');
const conseillerRHResolver = require('./conseillerRHResolver');
const compagnieAssuranceResolver = require('./compagnieAssuranceResolver');
const associationResolvers = require('./associationResolvers');

// Merge all resolvers
const resolvers = {
  Query: {
    ...adresseResolver.Query,
    ...beneficiaireResolver.Query,
    ...policeAssuranceResolver.Query,
    ...employeResolver.Query,
    ...conseillerRHResolver.Query,
    ...compagnieAssuranceResolver.Query
  },
  Mutation: {
    ...adresseResolver.Mutation,
    ...beneficiaireResolver.Mutation,
    ...policeAssuranceResolver.Mutation,
    ...employeResolver.Mutation,
    ...conseillerRHResolver.Mutation,
    ...compagnieAssuranceResolver.Mutation,
    ...associationResolvers.Mutation
  },
  Employe: employeResolver.Employe,
  PoliceAssurance: associationResolvers.PoliceAssurance,
  Beneficiaire: associationResolvers.Beneficiaire
};

module.exports = resolvers;