const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import database connection
const db = require('./src/config/database');

// Import GraphQL schema and resolvers
const typeDefs = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');

// Create Express application
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { req };
    },
    playground: false, // Disable default playground
    introspection: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Set up standalone GraphQL Playground
  app.get('/playground', expressPlayground({
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark',
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': false,
      'queryPlan.hideQueryPlanResponse': false,
      'editor.fontSize': 14,
      'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Monaco', monospace",
      'request.credentials': 'include'
    }
  }));

  // Connect to database and sync models
  try {
    await db.authenticate();
    console.log('Database connection established successfully.');
    
    await db.sync({ force: true });
    console.log('Database tables created successfully.');

    // Insert some test data
    const { Adresse, Beneficiaire, PoliceAssurance, Employe } = require('./src/models');
    
    // Create test police assurance
    await PoliceAssurance.create({
      numero_police: 'P123'
    });

    // Create test address
    const adresse = await Adresse.create({
      rue: '123 Rue Test',
      ville: 'Paris',
      code_postale: '75001'
    });

    // Create test beneficiaire
    await Beneficiaire.create({
      nom: 'Jean Dupont'
    });

    // Create test employe
    await Employe.create({
      numero_employe: 'E001',
      nom: 'Marie Martin',
      numero_police_assurance: 'P123',
      adresse_id: adresse.id
    });

    console.log('Test data inserted successfully.');
  } catch (error) {
    console.error('Database connection error:', error);
  }

  // Start server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL Playground available at http://localhost:${PORT}/playground`);
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startApolloServer().catch(err => {
  console.error('Failed to start server:', err);
});