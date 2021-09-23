declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    DATABASE_URL: string
    DB_LOGGING: string
    DB_SYNC: string
    NODE_ENV: string
  }
}
