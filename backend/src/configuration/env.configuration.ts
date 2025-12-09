const ENV = process.env

export const getEnvConfiguration = () => ({
  port: parseInt(ENV.PORT || '3000', 10),
  env: ENV.NODE_ENV || 'development',
  saltRounds: parseInt(ENV.SALT_ROUNDS || '10', 10),
  database: {
    url: ENV.DATABASE_URL,
    port: parseInt(ENV.DATABASE_PORT || '5432', 10),
  },
})
