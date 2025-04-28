const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Adresse {
    id: ID!
    rue: String
    ville: String
    code_postale: String
    employes: [Employe]
  }

  type Beneficiaire {
    id: ID!
    nom: String
    policesAssurancePrincipales: [PoliceAssurance]
    toutesLesPolicesAssurance: [PoliceAssurance]
  }

  type PoliceAssurance {
    numero_police: ID!
    employes: [Employe]
    beneficiairesPrincipaux: [Beneficiaire]
    tousLesBeneficiaires: [Beneficiaire]
  }

  type Employe {
    numero_employe: ID!
    nom: String
    numero_police_assurance: String
    adresse_id: Int
    policeAssurance: PoliceAssurance
    adresse: Adresse
  }

  type BeneficiairePrincipal {
    police_assurance_id: ID!
    beneficiaire_id: ID!
    policeAssurance: PoliceAssurance
    beneficiaire: Beneficiaire
  }

  type ListeBeneficiaire {
    police_assurance_id: ID!
    beneficiaire_id: ID!
    policeAssurance: PoliceAssurance
    beneficiaire: Beneficiaire
  }

  type ConseillerRH {
    identifiant: ID!
  }

  type CompagnieAssurance {
    id: ID!
    nom: String
  }

  # Input types for creating and updating
  input AdresseInput {
    rue: String
    ville: String
    code_postale: String
  }

  input BeneficiaireInput {
    nom: String!
  }

  input PoliceAssuranceInput {
    numero_police: ID!
  }

  input EmployeInput {
    numero_employe: ID!
    nom: String!
    numero_police_assurance: String
    adresse_id: Int
  }

  input ConseillerRHInput {
    identifiant: ID!
  }

  input CompagnieAssuranceInput {
    nom: String!
  }

  # Queries
  type Query {
    # Adresse queries
    adresse(id: ID!): Adresse
    adresses: [Adresse]
    
    # Beneficiaire queries
    beneficiaire(id: ID!): Beneficiaire
    beneficiaires: [Beneficiaire]
    
    # PoliceAssurance queries
    policeAssurance(numero_police: ID!): PoliceAssurance
    policesAssurance: [PoliceAssurance]
    
    # Employe queries
    employe(numero_employe: ID!): Employe
    employes: [Employe]
    
    # ConseillerRH queries
    conseillerRH(identifiant: ID!): ConseillerRH
    conseillersRH: [ConseillerRH]
    
    # CompagnieAssurance queries
    compagnieAssurance(id: ID!): CompagnieAssurance
    compagniesAssurance: [CompagnieAssurance]
  }

  # Mutations
  type Mutation {
    # Adresse mutations
    createAdresse(input: AdresseInput!): Adresse
    updateAdresse(id: ID!, input: AdresseInput!): Adresse
    deleteAdresse(id: ID!): Boolean
    
    # Beneficiaire mutations
    createBeneficiaire(input: BeneficiaireInput!): Beneficiaire
    updateBeneficiaire(id: ID!, input: BeneficiaireInput!): Beneficiaire
    deleteBeneficiaire(id: ID!): Boolean
    
    # PoliceAssurance mutations
    createPoliceAssurance(input: PoliceAssuranceInput!): PoliceAssurance
    deletePoliceAssurance(numero_police: ID!): Boolean
    
    # Employe mutations
    createEmploye(input: EmployeInput!): Employe
    updateEmploye(numero_employe: ID!, input: EmployeInput!): Employe
    deleteEmploye(numero_employe: ID!): Boolean
    
    # ConseillerRH mutations
    createConseillerRH(input: ConseillerRHInput!): ConseillerRH
    deleteConseillerRH(identifiant: ID!): Boolean
    
    # CompagnieAssurance mutations
    createCompagnieAssurance(input: CompagnieAssuranceInput!): CompagnieAssurance
    updateCompagnieAssurance(id: ID!, input: CompagnieAssuranceInput!): CompagnieAssurance
    deleteCompagnieAssurance(id: ID!): Boolean
    
    # Association mutations
    addBeneficiairePrincipal(police_assurance_id: ID!, beneficiaire_id: ID!): BeneficiairePrincipal
    removeBeneficiairePrincipal(police_assurance_id: ID!, beneficiaire_id: ID!): Boolean
    
    addListeBeneficiaire(police_assurance_id: ID!, beneficiaire_id: ID!): ListeBeneficiaire
    removeListeBeneficiaire(police_assurance_id: ID!, beneficiaire_id: ID!): Boolean
  }
`;

module.exports = typeDefs;