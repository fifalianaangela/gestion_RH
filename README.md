# Système de Gestion d'Assurance GraphQL API

Ce projet fournit une API GraphQL complète pour gérer un système d'assurance, incluant des polices d'assurance, des bénéficiaires, des employés et plus encore.

## Technologies utilisées

- Node.js
- Express
- Apollo Server (GraphQL)
- MySQL
- Sequelize ORM

## Configuration requise

- Node.js (v14 ou supérieur)
- MySQL

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
   ```
   npm install
   ```
3. Configurez la base de données MySQL :
   - Créez une base de données nommée `insurance_db`
   - Mettez à jour les informations de connexion dans le fichier `.env`

4. Créez les tables dans votre base de données MySQL :
   ```sql
   CREATE TABLE Adresse (
       id INT AUTO_INCREMENT PRIMARY KEY,
       rue VARCHAR(255),
       ville VARCHAR(100),
       code_postale VARCHAR(20)
   );

   CREATE TABLE Beneficiaire (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nom VARCHAR(255)
   );

   CREATE TABLE PoliceAssurance (
       numero_police VARCHAR(50) PRIMARY KEY
   );

   CREATE TABLE Employe (
       numero_employe VARCHAR(50) PRIMARY KEY,
       nom VARCHAR(255),
       numero_police_assurance VARCHAR(50),
       adresse_id INT,
       FOREIGN KEY (numero_police_assurance) REFERENCES PoliceAssurance(numero_police),
       FOREIGN KEY (adresse_id) REFERENCES Adresse(id)
   );

   CREATE TABLE BeneficiairePrincipal (
       police_assurance_id VARCHAR(50),
       beneficiaire_id INT,
       PRIMARY KEY (police_assurance_id, beneficiaire_id),
       FOREIGN KEY (police_assurance_id) REFERENCES PoliceAssurance(numero_police),
       FOREIGN KEY (beneficiaire_id) REFERENCES Beneficiaire(id)
   );

   CREATE TABLE ListeBeneficiaire (
       police_assurance_id VARCHAR(50),
       beneficiaire_id INT,
       PRIMARY KEY (police_assurance_id, beneficiaire_id),
       FOREIGN KEY (police_assurance_id) REFERENCES PoliceAssurance(numero_police),
       FOREIGN KEY (beneficiaire_id) REFERENCES Beneficiaire(id)
   );

   CREATE TABLE ConseillerRH (
       identifiant VARCHAR(50) PRIMARY KEY
   );

   CREATE TABLE CompagnieAssurance (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nom VARCHAR(255)
   );
   ```

5. Démarrez le serveur :
   ```
   npm start
   ```

6. Accédez à l'application :
   - L'application sera disponible à l'adresse : http://localhost:4000
   - Le GraphQL Playground est accessible à : http://localhost:4000/graphql

## Exemples d'utilisation

### Récupérer tous les employés

```graphql
query {
  employes {
    numero_employe
    nom
    adresse {
      rue
      ville
      code_postale
    }
    policeAssurance {
      numero_police
    }
  }
}
```

### Créer une nouvelle adresse

```graphql
mutation {
  createAdresse(input: {
    rue: "123 Rue Principale"
    ville: "Paris"
    code_postale: "75001"
  }) {
    id
    rue
    ville
    code_postale
  }
}
```

### Créer une police d'assurance et ajouter un bénéficiaire

```graphql
# 1. Créer une police d'assurance
mutation {
  createPoliceAssurance(input: {
    numero_police: "P123"
  }) {
    numero_police
  }
}

# 2. Créer un bénéficiaire
mutation {
  createBeneficiaire(input: {
    nom: "Marie Dupont"
  }) {
    id
    nom
  }
}

# 3. Ajouter le bénéficiaire comme bénéficiaire principal
mutation {
  addBeneficiairePrincipal(
    police_assurance_id: "P123", 
    beneficiaire_id: 1
  ) {
    police_assurance_id
    beneficiaire_id
  }
}
```

## Structure du projet

```
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Adresse.js
│   │   ├── Beneficiaire.js
│   │   ├── PoliceAssurance.js
│   │   ├── Employe.js
│   │   ├── BeneficiairePrincipal.js
│   │   ├── ListeBeneficiaire.js
│   │   ├── ConseillerRH.js
│   │   ├── CompagnieAssurance.js
│   │   └── index.js
│   ├── graphql/
│   │   ├── schema.js
│   │   ├── resolvers/
│   │   │   ├── adresseResolver.js
│   │   │   ├── beneficiaireResolver.js
│   │   │   ├── policeAssuranceResolver.js
│   │   │   ├── employeResolver.js
│   │   │   ├── conseillerRHResolver.js
│   │   │   ├── compagnieAssuranceResolver.js
│   │   │   ├── associationResolvers.js
│   │   │   └── index.js
├── public/
│   ├── index.html
│   └── styles.css
├── .env
├── server.js
├── package.json
└── README.md
```