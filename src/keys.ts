export namespace Env{
    // App
    export const ENV = process.env.ENV || 'dev'
    export const MONGOURI = process.env.MONGO || 'mongodb://localhost:27018/mvc'
    export const PORT = process.env.PORT || 3000
    export const JWT_SECTRET = process.env.JWT_SECTRET || '_shhhhhhh_'
    export const JWT_TIME_EX = process.env.JWT_TIME_EX || '4h'
    export const JWT_TIME_COOKIE = process.env.JWT_TIME_COOKIE || 90
    export const LADY_FAT = process.env.LADY_FAT || 'Docker_is_cool'

    // Prod Only
    export const MONGO_USERNAME = process.env.MONGO_USERNAME || 'demo'
    export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'demo'
    export const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'demo'
    export const MONGO_PORT = process.env.MONGO_PORT || 'demo'
    export const MONGO_DB = process.env.MONGO_DB || 'demo'
}
