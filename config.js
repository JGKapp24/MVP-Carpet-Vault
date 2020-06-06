require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 5432,
    database: process.env.DEV_DB_NAME || 'carpet_vault',
    user: process.env.USER,
    password: null,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST || 'database',
    port: parseInt(process.env.PROD_DB_PORT, 10) || 5432,
    database: process.env.PROD_DB_NAME || 'carpet_vault',
    user: process.env.PGUSER,
    password: process.env.PG_AWS_PASSWORD,
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];
