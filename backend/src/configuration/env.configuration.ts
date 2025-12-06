const ENV = process.env

export const getEnvConfiguration = () => ({
  port: parseInt(ENV.PORT || '3000', 10),
  database: {
    host: ENV.DATABASE_HOST || 'localhost',
    port: parseInt(ENV.DATABASE_PORT || '5432', 10),
  },
})
