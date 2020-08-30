// const dotenv = require('dotenv');
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.normalize(path.join(__dirname, '/config/.env.test'))
  });
} else {
  dotenv.config({
    path: path.normalize(path.join(__dirname, '/config/.env.development'))
  });
}

// Update with your config settings.
const database = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.normalize(path.join(__dirname, '/server/data/migrations'))
  },
  seeds: {
    directory: path.normalize(path.join(__dirname, '/server/data/seeds'))
  }
};

module.exports = {
  development: {
    ...database,
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    debug: true
  },

  test: {
    ...database,
    connection: {
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD
    },
    debug: true
  },

  production: {
    ...database,
    connection: process.env.DATABASE_URL,
    tableName: process.env.MIGRATIONS_TABLE
  }
};
