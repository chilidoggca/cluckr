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
      database: 'postgres://cbqvikukqioviv:b3f41cc461816d7b4d4e13cfbe7cd5f8c130dd61f1fadf4611289c873700d993@ec2-50-17-206-214.compute-1.amazonaws.com:5432/dd78qv9spj5j90',
    }
  }
};
