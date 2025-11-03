const { sequelize } = require('./models');

async function setupDatabase() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    
    // Sync all models to create tables
    await sequelize.sync({ force: true });
    console.log('Database tables created successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();