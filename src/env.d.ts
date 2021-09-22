declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    DB_URL: string
    DB_LOGGING: string
    DB_SYNC: string
  }
}
