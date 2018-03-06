const sharedConfig = {
  client: 'postgresql',
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
}
module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      database: 'clucks2_dev'
    }
  },
  staging: {
    ...sharedConfig,
    connection: {
      database: 'clucks_staging'
    }
  },
  production: {
    ...sharedConfig,
    connection: {
      database: 'clucks_production'
    }
  }
};
